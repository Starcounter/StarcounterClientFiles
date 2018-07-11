# &lt;uni-data-table&gt;

A custom element providing a data table with lazy loading and rich declarative
cell content.

## Demo

[Check it live!](http://Starcounter.github.io/Uniform.css/components/uni-data-table)

## Install

Install the component using [Bower](http://bower.io/):

```sh
$ bower install uniform.css --save
```

## Usage

1. Import polyfill:

    ```html
    <script src="bower_components/webcomponentsjs/webcomponents.min.js"></script>
    ```

2. Import the custom element:

    ```html
    <link rel="import" href="bower_components/uniform.css/components/uni-data-table/uni-data-table.html">
    ```

3. Start using it!

    ```html
    <uni-data-table size="2"
        rows-data='[
            {
                "Rows": [
                    {"FirstName": "Jane", "LastName": "Doe"},
                    {"FirstName": "Judy", "LastName": "Roe"}
                ]
            }
        ]'>
        <uni-data-table-column>
            <template slot="header">First Name</template>
            <template>[[item.FirstName]]</template>
        </uni-data-table-column>
        <uni-data-table-column>
            <template slot="header">Last Name</template>
            <template>[[item.LastName]]</template>
        </uni-data-table-column>
    </uni-data-table>
    ```

## View-model

### Rows data and lazy loading

`<uni-data-table>` supports lazy loading for pages of rows data.

The view-model is expected to have:

| Field | Type | Description |
| :--- | :--- | :--- |
| `RowsData` | `Array` | Array of pages of data, where indicies are page numbers, and values are objects containing the `Rows` key with an array of rows on the page. |
| `PageSize` | `Number` | The maximum number of rows on a single page. |
| `RowsCount` | `Number` | The total number of rows across all the pages. |
| `Page$` | `Number` | Writable page number trigger. `<uni-data-table>` modifies it to request another page from the server. |

Example view-model:

```json
{
    "Html": "/KitchenSink/Components/DataTablePage.html",
    "RowsData": [
        {
            "Rows": [
                {
                    "FirstName": "",
                    "LastName": "",
                    "Email$": "",
                    "DeleteTrigger$": 0
                }
            ]
        }
    ],
    "Page$": 0,
    "PageSize": 100,
    "RowsCount": 500
}
```

#### Example view

```html
<template>
    <dom-bind>
        <template>
            <uni-data-table slot="kitchensink/datatable-data-table"
                        rows-data="{{model.RowsData}}"
                        size="{{model.RowsCount}}"
                        page-size="{{model.PageSize}}"
                        page="{{model.Page$}}">
                <uni-data-table-column>
                    <template slot="header">
                        First Name
                    </template>
                    <template>
                        {{item.FirstName}}
                    </template>
                </uni-data-table-column>
                <uni-data-table-column>
                    <template slot="header">
                        Last Name
                    </template>
                    <template>
                        {{item.LastName}}
                    </template>
                </uni-data-table-column>
                <uni-data-table-column>
                    <template slot="header">
                        Email
                    </template>
                    <template>
                        <input type="email" value="{{item.Email$::change}}" placeholder="Email">
                    </template>
                </uni-data-table-column>
                <uni-data-table-column>
                    <template>
                        <button value="{{item.DeleteTrigger$::click}}" onmousedown="++this.value">Remove</button>
                    </template>
                </uni-data-table-column>
            </uni-data-table>
        </template>
    </dom-bind>
</template>
```

#### Workflow

- Assume the single page `PageSize` is `100` rows, and the total `RowsCount` has
    `500` rows.
- The initial view-model contains the configuration assumed above, together with
    the initial pages, e. g., the first visible page of `100` rows.
- `<uni-data-table>` presents the initial page to the end user, but also
    allows to scroll past the first `100` rows, knowing the total number.
- As the end user scrolls `<uni-data-table>`, eventually `<uni-data-table>`
    needs to load another page, which is not yet contained in the `RowsData`.
- To do that, `<uni-data-table>` sets the number of the requested page to the
    `page` property, which is bound to `{{model.Page$}}` trigger, and thus
    invokes the handler on the server.
- The server’s handler changes the `RowsData` array and adds the page.
- `<uni-data-table>` observes the `rowsData` property, which is bound
    to the `{{model.RowsData}}`, using the Polymer’s array splices observing.
    When a server adds or replaces a page of rows, `<uni-data-table>` can
    handle that and present the data to the end user.

** Note 1: it is important to not assume a specific order for page requests
on the server.** Usually, pages are requested in order, e. g.: 0, 1, 2, 3,
and so on. However, the end user can quickly scroll past several pages,
so `<uni-data-table>` might skip requesting some of them, for example, request
the last page 4, skipping pages 1, 2, and 3 in the middle, after the user
scrolls to the very bottom using the `Ctrl+End` keyboard shortcut.

Make sure that the server maintains consistent indicies with the page numbers,
e. g., the page 4 has the index of 4 in the `RowsData` array, otherwise
`<uni-data-table>` would be unable to detect its load. If needed, dummy page
items can be added to `RowsData` with empty objects for skipped pages, these
are ignored by `<uni-data-table>`.

```c#
// Correct: ensure the indicies are consistent with page numbers
// If skipping pages, insert dummy empty RowsData items in the middle
while (this.RowsData.ElementOrDefaultAt(page - 1) == null) {
    this.RowsData.Add();
}
var newRowsData = new DataTableRowsData();
newRowsData.Rows = // Db query
// Insert a RowsData item under the specific page index
this.RowsData.Insert(page, newRowsData)

// ---

// Incorrect: adds a RowsData item under unspecified index.
// var newRowsData = this.RowsData.Add();
// newRowsData.Rows = // Db query
```

** Note 2: to update a `RowsData` item on the server, for example, populate a
dummy empty `RowsData` item, make sure to replace the entire item in the array
instead of mutating it.** Due to how array mutations are serialized in
JSON-Patch, and how Palindrom and Polymer handle array patches on the client
side, it is more practical to replace the entire `RowsData` item instead of
changing only the `Rows` key.

```c#
// Correct: replaces a RowsData item in the array:
var newRowsData = new DataTableRowsData();
newRowsData.Rows = // Db query
this.RowsData[page] = newRowsData;

// ---

// Incorrect: mutates an item, `<uni-data-table>` does not support this
// this.RowsData[page].Rows = // Db query
// This would produce 100 array additions for every row in the `Rows`, and thus
//
```

** Note 3: when rows are added or removed, the server should also update
the `RowsCount` in the view-model. **

### Columns

The columns are configured using `<uni-data-table-column>` elements in the light
DOM of `<uni-data-table>`.

`<uni-data-table-column>` expects `<template>` elements in the light DOM:
```html
<uni-data-table-column>
    <template slot="header">Header (optional)</template>
    <template>Body cell template [[index]] [[item.Key]]</template>
    <template slot="footer">Footer (optional)</template>
</uni-data-table-column>
```

Some data related with columns should be shared with the server is using
the `{{model.Columns}}` view-model, such as: the column’s path, sorting states
and filter values.

#### Sizing, position, and visibility

`<uni-data-table-column>` supports the following attributes / properties:

- `width` - CSS length, the base width of the column, example: `100px`
- `flex-grow` - Number, the amount of free horizontal space distributed to this
    column, the default is `1`, set to `0` to prevent growing
- `resizable` - Boolean, enables resizing the column for the user by dragging
    the right edge of the column’s header
- `frozen` - Boolean, fix the column’s horizontal position for scrolling
- `hidden` - Boolean, hides the column in the table

**Note: columns have flex grow enabled by default.** As in the
[CSS Flexible Box Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox),
in case if the total sum of the column widths is smaller than
the `<uni-data-table>` width, the columns will stretch proportionaly
to their `flex-grow` values to fill the remaining space.

Example: a column with a non-flexible width of `50px`

```html
<uni-data-table-column width="50px" flex-grow="0">
    <!-- ... -->
</uni-data-table-column>
```

#### Example view-model

```json
{
    "Columns": [
        {
            "Path": "",
            "IsSortingAllowed": true,
            "SortDirection$": ""
        }
    ]
}
```

#### Example view

```html
<template>
    <dom-bind>
        <template>
            <uni-data-table>
                <uni-data-table-column path="{{model.Columns.0.Path}}"
                                       is-sorting-allowed="{{model.Columns.0.IsSortingAllowed}}"
                                       sort-direction="{{model.Columns.0.SortDirection$}}">
                    <template slot="header">First Name</template>
                    <template>[[item.FirstName]]</template>
                </uni-data-table-column>
                <uni-data-table-column path="{{model.Columns.1.Path}}"
                                       is-sorting-allowed="{{model.Columns.1.IsSortingAllowed}}"
                                       sort-direction="{{model.Columns.1.SortDirection$}}">
                    <template slot="header">Last Name</template>
                    <template>[[item.LastName]]</template>
                </uni-data-table-column>
            </uni-data-table>
        </template>
    </dom-bind>
</template>
```

## History

For detailed changelog, check [Releases](https://github.com/Starcounter/Uniform.css/releases).

## License

MIT

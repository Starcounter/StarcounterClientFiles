# &lt;uni-data-table&gt;

A custom element providing a data table with lazy loading and rich declarative
cell content.

## Demo

[Check it live!](https://starcounter.github.io/uniform.css/components/uni-data-table)

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
    <uni-data-table provider='{
            "TotalRows": 2,
            "Pages": [
                {
                    "Rows": [
                        {"FirstName": "Jane", "LastName": "Doe"},
                        {"FirstName": "Judy", "LastName": "Roe"}
                    ]
                }
            ]
        }'>
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

The `provider` view-model is expected to have:

| Field | Type | Description |
| :--- | :--- | :--- |
| `Pages` | `Array` | Array of pages of data, where indicies are page numbers, and values are objects containing the `Rows` key with an array of rows on the page. |
| `Pagination` | `Object` | An object that contains information about the number of pages with the following properties: `CurrentPageIndex$`, `PageSize$`, `PagesCount` (all of type `Number`). |
| `Columns` | `Array` | Array of column objects, which contain informations about the columns in following properties: `DisplayName`, `PropertyName`, `IsSortable`, `IsFilterable`, `Sort$`, `Filter$`. |
| `TotalRows` | `Number` | The total number of rows across all the pages. |


Example view-model:

```json
{
    "Html": "/KitchenSink/Components/DataTablePage.html",
    "TableProvider": {
        "Columns": [],
        "Pages": [
            {
                "Rows": [
                    {"FirstName": "Jane", "LastName": "Doe", "DOB": "1980-01-01"},
                    {"FirstName": "Judy", "LastName": "Roe", "DOB": "1980-01-02"},
                    {"FirstName": "Jane", "LastName": "Doe", "DOB": "1980-01-03"},
                    {"FirstName": "Judy", "LastName": "Roe", "DOB": "1980-01-04"},
                    {"FirstName": "Jane", "LastName": "Doe", "DOB": "1980-01-05"},
                ]
            }
        ],
        "TotalRows": 5,
        "Pagination": {
            "CurrentPageIndex$": 0,
            "PageSize$": 5,
            "PagesCount": 1
        }
    }
}
```

#### Example view

```html
<template>
    <dom-bind>
        <template>
            <uni-data-table slot="kitchensink/datatable-data-table"
                            provider="{{model.TableProvider}}">
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

#### Workflow with “infinite” scrolling

- Assume the single page `PageSize$` is `100` rows, and the total `TotalRows` has
    `500` rows.
- The initial view-model contains the configuration assumed above, together with
    the initial pages, e. g., the first visible page of `100` rows.
- `<uni-data-table>` presents the initial page to the end user, but also
    allows to scroll past the first `100` rows, knowing the total number.
- As the end user scrolls `<uni-data-table>`, eventually `<uni-data-table>`
    needs to load another page, which is not yet contained in the `Pages`.
- To do that, `<uni-data-table>` sets the number of the requested page to the
    `page` property, which is bound to `{{model.Page$}}` trigger, and thus
    invokes the handler on the server.
- The server’s handler changes the `Pages` array and adds the page.
- `<uni-data-table>` observes the `Rows` property, which is bound
    to the `{{model.Pages}}`, using the Polymer’s array splices observing.
    When a server adds or replaces a page of rows, `<uni-data-table>` can
    handle that and present the data to the end user.

** Note 1: it is important to not assume a specific order for page requests
on the server.** Usually, pages are requested in order, e. g.: 0, 1, 2, 3,
and so on. However, the end user can quickly scroll past several pages,
so `<uni-data-table>` might skip requesting some of them, for example, request
the last page 4, skipping pages 1, 2, and 3 in the middle, after the user
scrolls to the very bottom using the `Ctrl+End` keyboard shortcut.

Make sure that the server maintains consistent indicies with the page numbers,
e. g., the page 4 has the index of 4 in the `Pages` array, otherwise
`<uni-data-table>` would be unable to detect its load. If needed, dummy page
items can be added to `Pages` with empty objects for skipped pages, these
are ignored by `<uni-data-table>`.

```c#
// Correct: ensure the indicies are consistent with page numbers
// If skipping pages, insert dummy empty Pages items in the middle
while (this.Pages.ElementOrDefaultAt(page - 1) == null) {
    this.Pages.Add();
}
var newPagesItem = new DataTablePages();
newPagesItem.Rows = // Db query
// Insert a Pages item under the specific page index
this.Pages.Insert(page, newPagesItem)

// ---

// Incorrect: adds a Pages item under unspecified index.
// var newPagesItem = this.Pages.Add();
// newPagesItem.Rows = // Db query
```

** Note 2: to update a `Pages` item on the server, for example, populate a
dummy empty `Pages` item, make sure to replace the entire item in the array
instead of mutating it.** Due to how array mutations are serialized in
JSON-Patch, and how Palindrom and Polymer handle array patches on the client
side, it is more practical to replace the entire `Pages` item instead of
changing only the `Rows` key.

```c#
// Correct: replaces a Pages item in the array:
var newPagesItem = new DataTablePages();
newPagesItem.Rows = // Db query
this.Pages[page] = newPagesItem;

// ---

// Incorrect: mutates an item, `<uni-data-table>` does not support this
// this.Pages[page].Rows = // Db query
// This would produce 100 array additions for every row in the `Rows`, and thus
//
```

** Note 3: when rows are added or removed, the server should also update
the `TotalRows` in the view-model. **

#### Workflow in auto pagination mode

The client-server data workflow is exactly the same as the “infinite” scrolling
workflow described above. The only difference is that pagination is used
on the frontend to change the `Page$` trigger instead of scrolling in the
`<uni-data-table>`.

### Auto pagination mode

By default, `<uni-data-table>` uses “infinite” scrolling mode. This requires
the height of the `<uni-data-table>` to be constrained, that’s why it has
default height (`400px`).

The developer can switch from “infinite” scrolling mode to auto paginaton mode
by setting the `auto-pagination` attribute (or the boolean `autoPagination`
property to true). This makes several things:

- Limits the number of displayed rows at `PageSize`
- Shows builtin `<uni-paginaton>` if `RowsCount` exceeds the `PageSize` limit
- Changes the `<uni-data-table>` height to be `auto`, meaning that the total
    height of rows on the current page defines the height
    of the `<uni-data-table>`.

### Columns

The view-model is expected to have a `Columns` array of objects with
the following contents:

| Field | Type | Description |
| :--- | :--- | :--- |
| `DisplayName` | `String` | Displayed name for the column |
| `PropertyName` | `String` | The key name for the column data in the item objects |
| `IsSortable` | `Boolean` | Enable sorting for the column |
| `Sort$` | `String` | The direction of the sorting, options: `"asc"`, `"desc"`, `null` |
| `IsFilterable` | `Boolean` | Enable filtering for the column |
| `Filter$` | `String` | The value of the column filter text input |

Example view-model:

```json
{
    "TableProvider": {
        "Columns": [
            {
                "DisplayName": "First name",
                "PropertyName": "FirstName"
            }
        ],
        "Pages": ...,
    }
}
```


The columns can also be configured using `<uni-data-table-column>` elements
in the light DOM of `<uni-data-table>`.

`<uni-data-table-column>` expects `<template>` elements in the light DOM.

```html
<uni-data-table-column>
    <template slot="header">Header (optional)</template>
    <template>Body cell template [[index]] [[item.Key]]</template>
    <template slot="footer">Footer (optional)</template>
</uni-data-table-column>
```

You can also override a column given in `provider.Columns` array in HTML
by using the `index` property on the `<uni-data-table-column>`:

```html
<!-- Override the first column header template -->
<uni-data-table-column index="0">
    <template slot="header">My first column</template>
</uni-data-table-column>
```

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

#### Filtering

By providing [a column config](#columns) with `IsFilterable: true` you will get the default header with a text input to filter the values. You can use `<template slot="header">` to overwrite the look of your header and the element used for filtering. For example you can use the [`<vaadin-combo-box>`](https://vaadin.com/components/vaadin-combo-box) custom element to create filter specific for `Boolean` values:
```html
<uni-data-table-column index="1">
    <template slot="header">
      <style>
      /* Prefix your classes carefully, this tree scope is shared with other cells */
      vaadin-combo-box.assortment-manager-active-filter{
          width: 7em;
      }
      </style>
      <span>[[column.DisplayName]]</span>
      <uni-data-table-filter aria-label="[[column.DisplayName]] filter" path="item.[[column.PropertyName]]" value="[[column.Filter$]]">
          <vaadin-combo-box class="assortment-manager-active-filter"
                            slot="filter"
                            focus-target
                            items='[{"value": true, "label": "Yes"}, {"value": false, "label": "No"}]'
                            value="{{column.Filter$::change}}" placeholder="Any">
          </vaadin-combo-box>
    </uni-data-table-filter>
    </template>
</uni-data-table-column>
```
Use `<uni-data-table-filter>` to bind a `value` which you can use in your custom elements  with cells data at a given `path`.
To replace the default `vaadin-text-field` input element, set `slot="filter"` on your element.

## History

For detailed changelog, check [Releases](https://github.com/Starcounter/Uniform.css/releases).

## License

MIT

fetch(url, {{
  headers: {{
    accept: 'application/json'
  }}
}})
  .then(res => res.json())
  .then(model => {{
    const remoteUrl = url;
    if (!PalindromDOM.instances) {{
      PalindromDOM.instances = new Map();
    }}
    const registry = PalindromDOM.instances;
    if (!registry.get(remoteUrl)) {{
      registry.set(
        remoteUrl,
        new PalindromDOM({{
          listenTo: document,
          model: {{data: model}},
          remoteUrl,
          pingIntervalS: 60,
          useWebSocket: true,
          debug: false,
          ot: true,
          purity: false,
          localVersionPath: '/_ver#c$',
          remoteVersionPath: '/_ver#s'
        }})
      );
      const PC = document.querySelector('palindrom-client');
      PC.connectedCallback();
      // TODO: set also initial state, so we wan't need additional "establish" request
    }}
  }});

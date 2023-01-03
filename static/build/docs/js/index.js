const { SwaggerUIBundle, SwaggerUIStandalonePreset, YAML } = window;

function buildSwaggerUI(jsonSpec) {
  return SwaggerUIBundle({
    spec: jsonSpec,
    dom_id: "#swagger-ui",
    deepLinking: true,
    filter: "",
    showCommonExtensions: true,
    presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
    plugins: [SwaggerUIBundle.plugins.DownloadUrl],
    layout: "StandaloneLayout",
  });
}

window.addEventListener("load", async function () {
  try {
    const res = await fetch("/docs/api.yaml");
    const yamlText = await res.text();
    const yamlSpec = YAML.parse(yamlText);
    window.ui = buildSwaggerUI(yamlSpec);
  } catch (o) {
    throw new Error("Failed loading or interpreting the YAML file");
  }
});

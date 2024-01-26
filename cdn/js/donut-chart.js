(function(window, document, undefined) {
  "use strict";
  if ((typeof context == "undefined" || typeof context != "undefined" && context == document) && typeof window !== "undefined") {
    const donut_chart_template = document.createElement("template");
    donut_chart_template.innerHTML = `\n    <link rel="stylesheet" href="https://ashlar.blob.core.windows.net/ashlar-theme-files/css/components/donut-chart.css" />\n    <svg viewBox="0 0 31.83 31.83" role="img"> \n    </svg>\n  `;
    class WWUDonutChart extends HTMLElement {
      constructor() {
        super();
      }
      connectedCallback() {
        this.appendChild(donut_chart_template.content.cloneNode(true));
        const data = this.querySelectorAll("li");
        const svg = this.querySelector("svg");
        let offset = 0;
        svg.setAttribute("aria-label", "Donut chart of " + this.getAttribute("label"));
        for (let i = 0; i < data.length; i++) {
          const percent = data[i].innerText.substr(0, data[i].innerText.indexOf("%"));
          const slice = `\n        <circle r="15.915" cx="15.915" cy="15.915" \n        style="stroke-dashoffset: ${offset}; \n        stroke-dasharray: ${percent} 100;"/>`;
          svg.innerHTML += slice;
          offset -= parseFloat(percent);
        }
      }
    }
    window.customElements.define("wwu-donut-chart", WWUDonutChart);
  }
})(this, this.document);
if (
  (typeof context == "undefined" || (typeof context != "undefined" && context == document)) // makes it work in Drupal
  && typeof window !== "undefined" // makes it work in Node.js server side rendering
) {
  const donut_chart_template = document.createElement("template");
  donut_chart_template.innerHTML = `
    <!--link rel="stylesheet" href="https://ashlar.blob.core.windows.net/ashlar-theme-files/css/components/donut-chart.css" /-->
    <figure>
      <figcaption>
      </figcaption>
      <ul>
      </ul>
    </figure>
  `;
  
  class WWUDonutChart extends HTMLElement {
    constructor() {
      super();
    }
    
    connectedCallback() {
      let element_exists = this.classList.contains("element-created");
      if (!element_exists) {
        this.appendChild(donut_chart_template.content.cloneNode(true));
        this.classList.add("element-created");

        this.querySelector("figcaption").innerText = this.getAttribute("label");

        const data = this.querySelectorAll("wwu-chart-item");
        const chart = this.querySelector("ul");
        let offset = 0;

        for (let i = 0; i < data.length; i++) {
          const li = document.createElement("li");
          const pct = data[i].getAttribute("value");
          const label = data[i].innerText;   

          li.innerHTML = `${label} - ${pct}%`;
          li.style.setProperty('--pct', pct);
          li.style.setProperty('--bg-color', `var(--chart-color-${i})`);
          li.style.setProperty('--offset', `${offset}turn`);

          chart.append(li);
          offset += parseFloat(pct)/100;
        }    
      }
    }
  }
  
  if (!window.customElements.get('wwu-donut-chart')) {        
    window.customElements.define("wwu-donut-chart", WWUDonutChart);    
  }  
}

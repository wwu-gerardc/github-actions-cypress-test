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
        const chart = this.querySelector("figure");
        const list = document.createElement("ul");
        chart.append(list);
      
        let offset = 0;

        for (let i = 0; i < data.length; i++) {
          const pct = data[i].getAttribute("value");
          const label = data[i].innerText;   
          const chart_item = document.createElement("li");
          const slice = document.createElement("li");
          
          chart_item.classList.add("wwu-chart-item");
          chart_item.innerHTML = `${label} - ${pct}%`;          
          chart_item.style.setProperty('--bg-color', `var(--chart-color-${i})`);
          chart_item.style.setProperty('--bg-pattern', `var(--chart-pattern-${i})`);
          chart_item.style.setProperty('--bg-size', `var(--chart-bg-size-${i})`);
          chart_item.setAttribute('tabindex', 0);
          
          slice.classList.add("slice");
          slice.setAttribute("aria-hidden", true);
          slice.style.setProperty('--pct', pct);          
          slice.style.setProperty('--bg-color', `var(--chart-color-${i})`);
          slice.style.setProperty('--bg-pattern', `var(--chart-pattern-${i})`);
          slice.style.setProperty('--bg-size', `var(--chart-bg-size-${i})`);
          slice.style.setProperty('--offset', `${offset}turn`);

          list.append(chart_item);
          list.append(slice);

          offset += parseFloat(pct)/100;
        }    
      }
    }
  }
  
  if (!window.customElements.get('wwu-donut-chart')) {        
    window.customElements.define("wwu-donut-chart", WWUDonutChart);    
  }  
}

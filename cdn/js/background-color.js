(function(window, document, undefined) {
  "use strict";
  if ((typeof context == "undefined" || typeof context != "undefined" && context == document) && typeof window !== "undefined") {
    const background_color_template = document.createElement("template");
    background_color_template.innerHTML = `\n  <div class="bg-wrapper standard-padding">\n    <h1>H1 Heading <a href="https://wwu.edu/#nowhere">and link</a></h1>\n    <h2>H2 Heading <a href="https://wwu.edu/#nowhere">and link</a></h2>\n    <h3>H3 Heading <a href="https://wwu.edu/#nowhere">and link</a></h3>\n    <h4>H4 Heading <a href="https://wwu.edu/#nowhere">and link</a></h4>\n    <h5>H5 Heading <a href="https://wwu.edu/#nowhere">and link</a></h5>\n\n    <p class="tagline">Tagline Text</p>\n\n    <p>Regular Text with <a href="https://wwu.edu/#nowhere">a regular link</a> and a <a href="https://wwu.edu/">visited link</a></p>\n\n    <blockquote>Blockquote</blockquote>\n\n    <hr/>\n\n    <blockquote class="dark-blue-bg">Blockquote</blockquote>\n\n    <form>\n      <label class="required" for="input">Form element</label>\n      <input id="input"/>\n    </form>\n\n    <ul>\n        <li><a href="https://wwu.edu/#nowhere">Regular</a></li>\n        <li><a href="https://wwu.edu/#nowhere">list with this</a></li>\n        <li>background, and a <a href="https://wwu.edu/#nowhere">bunch of links</a></li>\n    </ul>\n\n    <div class="block--beyond-basics-block">\n        <ul class="menu">\n        <li><a href="https://wwu.edu/#nowhere">List of links</a></li>\n        <li><a href="https://wwu.edu/#nowhere">with menu class</a></li>\n        <li><a href="https://wwu.edu/#nowhere" aria-current="page">this one is the current page</a></li>\n        </ul>\n    </div>\n\n    <div class="ctas">\n        <a class="cta" href="https://wwu.edu/#nowhere">Call to Action</a><br/>\n        <a class="cta" href="https://wwu.edu/">Visited CTA</a><br/>\n        <a class="cta blue" href="https://wwu.edu/#nowhere">CTA with .blue class</a><br/>\n        <a class="cta dark-blue" href="https://wwu.edu/#nowhere">CTA with .dark-blue class</a><br/>\n        <a class="cta light-green" href="https://wwu.edu/#nowhere">CTA with .light-green class</a><br/>\n        <a class="cta white" href="https://wwu.edu/#nowhere">CTA with .white class</a>\n    </div>\n\n    <div class="buttons">\n      <button>Button</button>\n      <button class="alt">With .alt class</button>\n      <button class="warning">With .warning class</button>\n      <button disabled>Disabled Button</button>\n    </div>\n\n    <wwu-social group="Western" url="https://www.facebook.com/westernwashingtonuniversity"></wwu-social>\n    <wwu-social group="Western" url="https://www.flickr.com/photos/wwu"></wwu-social>\n    <wwu-social group="Western" url="https://www.instagram.com/westernwashingtonuniversity/"></wwu-social>\n    <wwu-social group="Western" url="https://www.linkedin.com/school/western-washington-university/"></wwu-social>\n    <wwu-social group="Western" url="https://www.snapchat.com/add/"></wwu-social>\n    <wwu-social group="Western" url="https://www.threads.net/@westernwashingtonuniversity"></wwu-social>\n    <wwu-social group="Western" url="https://twitter.com/WWU"></wwu-social>\n    <wwu-social group="Western" url="https://www.tiktok.com/@westernwauniversity"></wwu-social>\n    <wwu-social group="Western" url="https://vimeo.com/user30954810"></wwu-social>\n    <wwu-social group="Western" url="https://www.youtube.com/wwu"></wwu-social>\n\n    <table class="blue auto-layout align-top">\n      <caption>Custom classes applied to this table: light-blue fixed align-top</caption>\n      <tr>\n          <th id="t1-row-1-col-1" scope="col"><a href="https://wwu.edu/#nowhere">Row Group</a></th>\n          <th id="t1-row-1-col-2" scope="col">Col Header</th>\n          <th id="t1-row-1-col-3" colspan="2" scope="col"><a href="https://wwu.edu/#nowhere">Col Group</a></th>\n          <th id="t1-row-1-col-4" colspan="3" scope="col">Col Group</th>\n      </tr>\n      <tr>\n          <th id="t1-row-2-col-1" rowspan="3" scope="row">Row Group</th>\n          <th id="t1-row-2-col-2" scope="row">Row Header</th>\n          <th id="t1-row-2-col-3" scope="col">Col Header</th>\n          <th id="t1-row-2-col-4" scope="col">Col Header</th>\n          <th id="t1-row-2-col-5" scope="col">Col Header</th>\n          <th id="t1-row-2-col-6" scope="col">Col Header</th>\n          <th id="t1-row-2-col-7" scope="col">Col Header</th>\n      </tr>\n      <tr>\n          <th id="t1-row-3-col-2" scope="row">Row Header</th>\n          <td headers="t1-row-1-col-3 t1-row-2-col-1 t1-row-3-col-2 t1-row-2-col-3"><a href="https://wwu.edu/#nowhere">Link</a></td>\n          <td headers="t1-row-1-col-3 t1-row-2-col-1 t1-row-3-col-2 t1-row-2-col-4"><a href="https://wwu.edu/#nowhere">Link</a></td>\n          <td headers="t1-row-1-col-4 t1-row-2-col-1 t1-row-3-col-2 t1-row-2-col-5">Many <br/>Lines <br/>of <br/>Data</td>\n          <td headers="t1-row-1-col-4 t1-row-2-col-1 t1-row-3-col-2 t1-row-2-col-6">Data</td>\n          <td headers="t1-row-1-col-4 t1-row-2-col-1 t1-row-3-col-2 t1-row-2-col-7">Data</td>\n      </tr>\n      <tr>\n          <th id="t1-row-4-col-2" scope="row">Row Header</th>\n          <td headers="t1-row-1-col-3 t1-row-2-col-1 t1-row-4-col-2 t1-row-2-col-3">More words taking up a single cell on table</td>\n          <td headers="t1-row-1-col-3 t1-row-2-col-1 t1-row-4-col-2 t1-row-2-col-4">Supercalifragilisticexpialidocious</td>\n          <td headers="t1-row-1-col-4 t1-row-2-col-1 t1-row-4-col-2 t1-row-2-col-5">Data</td>\n          <td headers="t1-row-1-col-4 t1-row-2-col-1 t1-row-4-col-2 t1-row-2-col-6">Data</td>\n          <td headers="t1-row-1-col-4 t1-row-2-col-1 t1-row-4-col-2 t1-row-2-col-7">Data</td>\n      </tr>\n    </table>\n  </div>\n  `;
    class WWUBackgroundColor extends HTMLElement {
      constructor() {
        super();
      }
      connectedCallback() {
        /* Create the custom element by appending the template */
        this.appendChild(background_color_template.content.cloneNode(true));
        this.querySelector(".bg-wrapper").classList.add(this.attributes.color.value + "-bg");
      }
    }
    window.customElements.define("wwu-background-color", WWUBackgroundColor);
  }
})(this, this.document);
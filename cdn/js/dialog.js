(function(window, document, undefined) {
  "use strict";
  if ((typeof context == "undefined" || typeof context != "undefined" && context == document) && typeof window !== "undefined") {
    const wwu_dialog = document.createElement("template");
    wwu_dialog.innerHTML = `\n        <button class="open-button"></button>\n        \n        <dialog role="dialog" aria-modal="true">\n        <div class="dialog-wrapper">        \n            <div class="dialog-content">\n            </div>\n        </div>       \n        </dialog>             \n        \n        `;
    class WWUDialog extends HTMLElement {
      constructor() {
        super();
      }
      connectedCallback() {
        const content = this.innerHTML;
        this.innerHTML = ``;
        this.appendChild(wwu_dialog.content.cloneNode(true));
        const open_button = this.querySelector(".open-button");
        const close_button = document.createElement("button");
        const icon = document.createElement("span");
        const dialog = this.querySelector("dialog");
        const dialog_content = this.querySelector(".dialog-content");
        open_button.innerText = this.getAttribute("button");
        icon.classList.add("material-icons");
        icon.setAttribute("aria-hidden", true);
        icon.innerText = this.getAttribute("icon");
        open_button.appendChild(icon);
        close_button.innerHTML = `<span class="material-icons" aria-hidden="true">close</span> Close`;
        close_button.classList.add("close-button");
        dialog.setAttribute("aria-label", this.getAttribute("label"));
        dialog_content.innerHTML = content;
        dialog_content.prepend(close_button);
        open_button.addEventListener("click", (() => {
          open_dialog(dialog);
        }));
        /* close if close button is clicked */        close_button.addEventListener("click", (() => {
          close_dialog(dialog);
        }));
        /* close if area outside dialog is clicked */        document.addEventListener("click", (e => {
          let elementClass = e.target.className;
          if (elementClass == "dialog-wrapper") {
            close_dialog(dialog);
          }
        }));
      }
    }
    window.customElements.define("wwu-dialog", WWUDialog);
    function open_dialog(x) {
      x.showModal();
    }
    function close_dialog(x) {
      x.close();
      /* Remove and re-add iframes to stop video playback without needing an api */      const iframe = x.parentNode.querySelector("iframe");
      const iframe_container = iframe.parentNode;
      iframe.remove();
      iframe_container.appendChild(iframe);
    }
  }
})(this, this.document);
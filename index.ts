import { log } from "@rikka/API/Utils";
import { owoifyText } from "@rikka/API/Utils/strings/owoify";
import RikkaPlugin from "@rikka/Common/entities/Plugin";

export default class ExamplePlugin extends RikkaPlugin {
  inject() {
    log("owo");

    document.body.addEventListener("DOMNodeInserted", (event) => {
      if (event.target instanceof HTMLElement) {
        this.recurse(event.target);
      }
    });
    this.recurse(document.body);
  }

  private recurse(node: HTMLElement) {
    if (
      ["STYLE", "SCRIPT", "NOSCRIPT", "IFRAME", "OBJECT"].includes(node.tagName)
    ) { return; }
    node.childNodes.forEach((child) => {
      this.recurse(child as HTMLElement);
    });
    if (node.nodeType === 3 && node.nodeValue != null) {
      node.nodeValue = owoifyText(node.nodeValue);
    }
  }
}

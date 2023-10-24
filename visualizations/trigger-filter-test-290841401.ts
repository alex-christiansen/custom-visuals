// google ticket number 290841401 for trigger("filter") feature not working
// rename to file to .ts extension
import type { Looker, VisualizationDefinition } from "../types/types";

declare let looker: Looker;

interface VisInterface extends VisualizationDefinition {
  container?: HTMLDivElement;
}

export const VisObj: VisInterface = {
  id: "simple-react-map",
  label: "simple-react-map",
  options: {},
  create: function (element) {
    const pre = document.createElement("pre");
    pre.innerText = `button.addEventListener("click", () => {
      this.trigger("filter", [
        {
          field: "risk_events.category",
          value: "Transportation",
          run: true,
        },
      ]);
    });
    `;
    element.appendChild(pre);

    const button = document.createElement("button");

    const vis = this;
    button.addEventListener("click", () => {
      if (vis.trigger) {
        console.log("vis trigger exists");
        console.log("button clicked");
        vis.trigger("filter", [
          {
            field: "risk_events.category",
            value: "Transportation",
            run: true,
          },
        ]);
        console.log("trigger called");
        console.log("vis object", this);
      }
    });
    button.innerText = `Set filter to "Transportation" and run query`;
    element.appendChild(button);
  },
  // Render in response to the data or settings changing
  updateAsync: function (data, element, config, queryResponse, details, done) {
    // Clear any errors from previous updates
    if (this.clearErrors) this.clearErrors();

    // Throw some errors and exit if the shape of the data isn't what this chart needs
    if (queryResponse.fields.dimensions.length == 0 && this.addError) {
      this.addError({
        title: "No Dimensions",
        message: "This chart requires dimensions.",
      });
      return;
    }

    done();
  },
};

looker.plugins.visualizations.add(VisObj);

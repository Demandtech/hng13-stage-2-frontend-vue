import { defineComponent, h } from "vue";

export const Ticket = defineComponent({
  name: "Ticket",
  props: { class: [String, Array, Object] },
  setup(props) {
    return () =>
      h(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          width: 24,
          height: 24,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": 2,
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          class: ["lucide lucide-circle-check", props.class],
        },
        [
          h("path", {
            d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
          }),
          h("path", { d: "M13 5v2" }),
          h("path", { d: "M13 17v2" }),
          h("path", { d: "M13 11v2" }),
        ]
      );
  },
});

export const LogOut = defineComponent({
  name: "LogOut",
  props: { class: [String, Array, Object] },
  setup(props) {
    return () =>
      h(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          class: ["lucide lucide-log-out-icon lucide-log-out", props.class],
        },
        [
          h("path", { d: "m16 17 5-5-5-5" }),
          h("path", { d: "M21 12H9" }),
          h("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }),
        ]
      );
  },
});

export const CheckCircle = defineComponent({
  name: "CheckCircle",
  props: { class: [String, Array, Object] },
  setup(props) {
    return () =>
      h(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          class: [
            "lucide lucide-circle-check-icon lucide-circle-check",
            props.class,
          ],
        },
        [
          h("circle", { cx: "12", cy: "12", r: "10" }),
          h("path", { d: "m9 12 2 2 4-4" }),
        ]
      );
  },
});

export const XCircle = defineComponent({
  name: "XCircle",
  props: { class: [String, Array, Object] },
  setup(props) {
    return () =>
      h(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          class: ["lucide lucide-circle-x-icon lucide-circle-x", props.class],
        },
        [
          h("circle", { cx: "12", cy: "12", r: "10" }),
          h("path", { d: "m15 9-6 6" }),
          h("path", { d: "m9 9 6 6" }),
        ]
      );
  },
});

export const Clock = defineComponent({
  name: "Clock",
  props: { class: [String, Array, Object] },
  setup(props) {
    return () =>
      h(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          class: [
            "lucide lucide-circle-alert-icon lucide-circle-alert",
            props.class,
          ],
        },
        [
          h("circle", { cx: "12", cy: "12", r: "10" }),
          h("path", { d: "M12 6v6l4 2" }),
        ]
      );
  },
});

export const Loader = defineComponent({
  name: "Loader",
  props: { class: [String, Array, Object] },
  setup(props) {
    return () =>
      h(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          class: ["lucide lucide-loader-icon lucide-loader", props.class],
        },
        [
          h("path", { d: "M12 2v4" }),
          h("path", { d: "m16.2 7.8 2.9-2.9" }),
          h("path", { d: "M18 12h4" }),
          h("path", { d: "m16.2 16.2 2.9 2.9" }),
          h("path", { d: "M12 18v4" }),
          h("path", { d: "m4.9 19.1 2.9-2.9" }),
          h("path", { d: "M2 12h4" }),
          h("path", { d: "m4.9 4.9 2.9 2.9" }),
        ]
      );
  },
});

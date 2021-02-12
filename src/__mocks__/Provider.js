import context from "../Context/Context";

export const MyContext = {
  Consumer(props) {
    return props.children(context);
  },
};

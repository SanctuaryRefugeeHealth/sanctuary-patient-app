import React from "react";

const ContentSwitch = ({ index, children, ...rest }) => {
  const arr = React.Children.toArray(children);

  if (index >= 0 && index < arr.length) {
    return React.cloneElement(arr[index], rest);
  }

  return null;
};

export default ContentSwitch;

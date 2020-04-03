import React, { Suspense } from "react";

const TemplateDefault = ({ children }) => {
  return <Suspense fallback={<div />}>{children}</Suspense>;
};

export default TemplateDefault;

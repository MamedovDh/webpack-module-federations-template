
declare module '*.module.sass' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module '*/Router' {
  type Route = {
    path : '',
    element : JSX.Element,
    children ?: Route[]
  }
  const routes: Route[];
  export = routes;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module "*.svg" {
	import React from "react"
	const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
	export default SVG;
}

declare const __PLATFORM__ : 'desktop' | 'mobile'
declare const __ENV__ : 'development' | 'production'
import { h } from 'preact';

type IconOptions = {
  width: number,
  height: number,
  classes?: string
}

const CheckmarkIcon = (options: IconOptions) => {
  const { width, height, classes } = options;
  return <svg version="1.1" id="Capa_1" x="0px" y="0px" width={width + 'px'} height={height + 'px'} class={classes} viewBox="0 0 97.619 97.618" style="enable-background:new 0 0 97.619 97.618;"><g><path d="M96.939,17.358L83.968,5.959c-0.398-0.352-0.927-0.531-1.449-0.494C81.99,5.5,81.496,5.743,81.146,6.142L34.1,59.688
   L17.372,37.547c-0.319-0.422-0.794-0.701-1.319-0.773c-0.524-0.078-1.059,0.064-1.481,0.385L0.794,47.567
   c-0.881,0.666-1.056,1.92-0.39,2.801l30.974,40.996c0.362,0.479,0.922,0.771,1.522,0.793c0.024,0,0.049,0,0.073,0
   c0.574,0,1.122-0.246,1.503-0.68l62.644-71.297C97.85,19.351,97.769,18.086,96.939,17.358z"/></g>
  </svg>;
}

export const Icon = (props: { id: string, options: IconOptions }) => {
  switch(props.id) {
    case 'checkmark':
    default: return <CheckmarkIcon {...props.options} />;
  }
}

import * as Icons from '@assets/svgs';

export type SvgIconProps = {
  name: keyof typeof Icons;
  width: string | number | undefined;
  height: string | number | undefined;
  fill: string;
  stroke?: string;
};
function SvgIcon({ name, width, height, fill, stroke }: SvgIconProps) {
  const Svg = Icons[name];
  return <Svg width={width} height={height} fill={fill} stroke={stroke ?? undefined} />;
}

export default SvgIcon;

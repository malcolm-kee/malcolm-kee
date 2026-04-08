/**
 * Component with props
 */
export default function MyApp(props: { name: string }) {
  const { name = 'World' } = props;
  return <div>Hello {name}</div>;
}

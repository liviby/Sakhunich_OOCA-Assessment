export default function Markup({ content }) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

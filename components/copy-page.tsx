import useCopyAsMarkdown from '@nkzw/copy-as-markdown';

export default function CopyPageButton() {
  const setRef = useCopyAsMarkdown({
    headingStyle: 'atx', // Use # for headings
    bulletListMarker: '-',
  });

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => {
          // The hook automatically handles the copy-to-clipboard logic 
          // when the user triggers a 'copy' event on the ref'd element.
          alert("Now copy any text on this page to get it as Markdown!");
        }}
        className="px-4 py-2 bg-black text-white rounded-md"
      >
        Copy Page as Markdown
      </button>

      {/* Wrap your main doc content with the ref */}
      <div ref={setRef}>
        {/* Your <MDXContent /> or page body goes here */}
      </div>
    </div>
  );
}

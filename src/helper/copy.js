const clipboardCopy=require("clipboard-copy")
export const copyClipboard= async (linkToCopy)=>{
    try {
        await clipboardCopy(linkToCopy);
        alert('Link copied to clipboard');
      } catch (error) {
        console.error('Failed to copy link: ', error);
        alert('Failed to copy link. Please copy it manually.');
      }
}
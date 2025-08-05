import { useEffect, useState } from "react";

const TagList = () => {
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    setTags(["tag1", "tag2", "tag3"]);
  }, []);

  return (
    <ul>
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
};

export default TagList;

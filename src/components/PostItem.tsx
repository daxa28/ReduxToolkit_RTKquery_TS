import CloseButton from 'react-bootstrap/CloseButton';
import React, { FC } from "react";
import { IPost } from "../models/IPost";

interface PostItemProps {
  post: IPost;
  remove: (post: IPost) => void;
  update: (post: IPost) => void;
}

const PostItem: FC<PostItemProps> = ({ post, remove, update }) => {
  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    remove(post);
  };

  const handelUpdate = (event: React.MouseEvent) => {
    const title = prompt("Введите новый заголок для данного поста:") || "";
    update({ ...post, title });
  };

  return (
    <div className='d-flex justify-content-between' onDoubleClick={handelUpdate} >
      <div>
        {post.id}. {post.title}
        <br /><p className="fst-italic">— {post.author}</p>
      </div>
        <CloseButton onClick={handleRemove}/>
    </div>
  );
};

export default PostItem;

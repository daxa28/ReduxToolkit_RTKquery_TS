import React from "react";
import { postAPI } from "../services/PostService";
import PostItem from "./PostItem";
import { IPost } from "../models/IPost";

const PostContainer2 = () => {
  const {
    data: posts,
    error,
    isLoading,
    refetch,
  } = postAPI.useFetchAllPostsQuery(20);

  return (
    <div>
      <button onClick={() => refetch()}>Refetch</button>
      {isLoading ? (
        <div>Loading..</div>
      ) : (
        <div>
          {error ? (
            <div>Ошибка {(error as any).status}</div>
          ) : (
            <div>
              {posts && posts.map((post) => <div key={post.id}>{post.id}</div>)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostContainer2;

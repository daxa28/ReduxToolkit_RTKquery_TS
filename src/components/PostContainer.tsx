import React, { Fragment, useEffect, useState } from "react";
import { postAPI } from "../services/PostService";
import PostItem from "./PostItem";
import { IPost } from "../models/IPost";
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Spinner } from "react-bootstrap";


const PostContainer = () => {
  const [limit, setLimit] = useState(20);
  const {
    data: posts,
    error,
    isLoading,
    refetch,
  } = postAPI.useFetchAllPostsQuery(
    limit
    // {pollingInterval: 2000}
  );

  const [createPost, { error: createError, isLoading: isCreateLoading }] =
    postAPI.useCreatePostMutation();
  const [removePost, { }] = postAPI.useDeletePostMutation();
  const [updatePost, { }] = postAPI.useUpdatePostMutation();

  //   useEffect(() => {
  //     setTimeout(() => {
  //       setLimit(4);
  //     }, 2000);
  //   }, []);

  const handleCreate = async () => {
    const title = prompt("Введите заголовок поста");
    const author = prompt("Введите автора поста");
    await createPost({ title, author } as IPost);
  };

  const handleRemove = (post: IPost) => {
    removePost(post);
  };

  const handleUpdate = (post: IPost) => {
    updatePost(post);
  };

  return (
    <div>

      <Button className='d-block my-2 mx-auto' variant="secondary" onClick={handleCreate}>Add new post</Button>
      <Button className='d-block my-2 mx-auto' variant="secondary" onClick={() => refetch()}>Refetch</Button>


      {isLoading ? (
        <Spinner className="d-block mx-auto" animation="border" variant="secondary" />
      ) : (
        <Fragment>
          {error ? (
            <h4>Ошибка {(error as any).status}</h4>
          ) : (
            <Fragment>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="button-tooltip-2">
                    *При двойном клике по выбранному посту
                    вы можете изменить его заголовок.
                  </Tooltip>
                }
              >
                {({ ref, ...triggerHandler }) => (
                  <div className="d-flex justify-content-end">
                    <h5 {...triggerHandler} ref={ref} className="me-3 text-secondary border border-secondary px-2 rounded-circle">?</h5>
                  </div>
                )}
              </OverlayTrigger>

              <ListGroup className="mb-5">
                {posts &&
                  posts.map((post) => (
                    <ListGroup.Item variant="secondary">
                      <PostItem
                        remove={handleRemove}
                        update={handleUpdate}
                        post={post}
                        key={post.id}
                      />
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default PostContainer;

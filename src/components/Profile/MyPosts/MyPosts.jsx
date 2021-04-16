import React from 'react';
import s from "./MyPosts.module.css";
import Posts from './Posts/Posts';



const MyPosts = React.memo (props => {

    let postsElement =
     props.posts.map( p => <Posts message={p.message}
                                              likesCount={p.likesCount} />);

    let newPostElement = React.createRef();

    let onAddPost = () => {
        props.addPost();
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    }



    return (
    <div className={s.my__posts}>
        <h3> My posts </h3>

        <div className={s.new__post}>
            <div> New post </div>
            <textarea onChange={onPostChange} ref={newPostElement}
                      value ={props.newPostText}/>
        </div>
        <div className={s.new__post}>
            <button onClick={ onAddPost }> Add post </button>
        </div>

        <div className={s.posts}>
            {postsElement}
        </div>


    </div>

)
});

export default MyPosts;
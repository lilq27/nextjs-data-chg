'use client';
import { useFormState } from "react-dom";
import FormSubmit from "./form-submit";

export default function PostForm({createPost}) {
    console.log('createPost', createPost);
    const [state, formAction] = useFormState(createPost, {});
    //createPost가 받는 첫번째 인자는 {}

    return (
        <>
        <h1>Create a new post</h1>
        <form action={formAction}>
        <p className="form-control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" />
        </p>
        <p className="form-control">
            <label htmlFor="image">Image</label>
            <input
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            name="image"
            />
        </p>
        <p className="form-control">
            <label htmlFor="content">Content</label>
            <textarea id="content" name="content" rows="5" />
        </p>
        <FormSubmit />
        {state.errors && (
            <ul className="form-errors">
                {state.errors.map(error => (
                    <li key = {error}>{error}</li>
                ))}
            </ul>
        )}
        </form>
        </>
    );
}
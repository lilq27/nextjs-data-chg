"use server";
import { uploadImage } from '@/lib/cloudinary';
import { storePost, updatePostLikeStatus } from '@/lib/posts';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPost(prevState, formData) {
    
    console.log('prevState, formData', prevState, formData);

    const title = formData.get('title');
    const image = formData.get('image');
    const content = formData.get('content');

    let errors = [];
    
    if(!title || title.trim().length === 0) {
      errors.push('Title is required.');
    }

    if(!content || content.trim().length === 0) {
      errors.push('Content is required.');
    }
    
    if(!image || image.size === 0) {
      errors.push('Image is required.');
    }

    if(errors.length > 0) {
      return { errors };
    }

    let imageUrl;
    try {
        imageUrl = await uploadImage(image);
    } catch (error) {
        throw new Error('이미지 업로드 실패');
    }

    await storePost({
      imageUrl: imageUrl,
      title,
      content,
      userId: 1
    });
    
    revalidatePath('/', 'layout'); 
    redirect('/feed');
  }

  export async function togglePostLikeStatus(postId) {
    updatePostLikeStatus(postId, 2); //포스트 아이디 1, 사용자 아이디 2로 가정
    revalidatePath('/', 'layout'); //nextjs에서 캐시방지 업데이트 되면 재검증
  }
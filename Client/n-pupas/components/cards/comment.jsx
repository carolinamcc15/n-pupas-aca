
const CommentCard = ({ comment }) => {
    return (
      <article className='bg-white shadow-md p-4'>
        <p className='mb-1'>{comment.comment}</p>
        <div className="flex flex-row gap-2 justify-end pr-2 ">
          <span className='font-light text-gray-700 text-sm bg-gray-100 py-1 px-2 rounded-full'>{comment.reportDate}</span>
        </div>
      </article>
    );
  };
  
  export default CommentCard;

  
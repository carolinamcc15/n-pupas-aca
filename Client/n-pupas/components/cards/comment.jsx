
const CommentCard = ({ comment }) => {
    return (
      <article className='bg-white shadow-md p-4'>
        <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
          <p className='text-gray-500 text-sm'>{comment.reportDate}</p>
        </div>
        <p>{comment.comment}</p>
      </article>
    );
  };
  
  export default CommentCard;

  
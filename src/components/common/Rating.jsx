function Rating({ value, totalReviews }) {

  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-1">
      
      {stars.map((starNumber) => (
        <span key={starNumber} className="text-yellow-400">
          {starNumber <= value ? "★" : "☆"}
        </span>
      ))}

      {totalReviews && (
        <span className="text-sm text-gray-500 ml-1">({totalReviews})</span>
      )}

    </div>
  );
}

export default Rating;
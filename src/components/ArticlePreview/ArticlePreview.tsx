import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Article } from '../../types/article';

export function ArticlePreview({
  article: {
    createdAt,
    favorited,
    favoritesCount,
    slug,
    title,
    description,
    tagList,
    author: { image, username },
  },
  isSubmitting,
  onFavoriteToggle,
  onMoveArticle,
}: {
  article: Article;
  isSubmitting: boolean;
  onFavoriteToggle?: () => void;
  onMoveArticle?: (movement: number) => void;
}) {
  return (
    <div className='article-preview'>
      <div className='article-meta'>
        <Link to={`/profile/${username}`} className='author'>
          <img src={image || undefined} />
        </Link>
        <div className='info'>
          <Link to={`/profile/${username}`} className='author'>
            {username}
          </Link>
          <span className='date'>{format(createdAt, 'PP')}</span>
        </div>

        <button
          className={`btn btn-sm pull-xs-right btn-primary`}
          aria-label='Up'
          disabled={false}
          onClick={() => onMoveArticle?.(1)}
        >
          <i className='ion-android-arrow-up'></i>
        </button>

        <button
          className={`btn btn-sm pull-xs-right btn-primary`}
          style={{ marginRight: '3px' }}
          aria-label='Down'
          disabled={false}
          onClick={() => onMoveArticle?.(-1)}
        >
          <i className='ion-android-arrow-down'></i>
        </button>

        <button
          className={`btn btn-sm pull-xs-right ${favorited ? 'btn-primary' : 'btn-outline-primary'}`}
          style={{ marginRight: '3px' }}
          aria-label='Toggle Favorite'
          disabled={isSubmitting}
          onClick={onFavoriteToggle}
        >
          <i className='ion-heart'></i> {favoritesCount}
        </button>
      </div>
      <a href={`/#/article/${slug}`} className='preview-link'>
        <h1>{title}</h1>
        <p>{description}</p>
        <span>Read more...</span>
        <TagList tagList={tagList} />
      </a>
    </div>
  );
}

export function TagList({ tagList }: { tagList: string[] }) {
  return (
    <ul className='tag-list'>
      {tagList.map((tag) => (
        <li key={tag} className='tag-default tag-pill tag-outline'>
          {tag}
        </li>
      ))}
    </ul>
  );
}

import { Button } from 'antd';
import { useState } from 'react';

interface FollowButtonProps {
  isActive?: boolean;
  createFollow?: () => Promise<Response>;
  deleteFollow?: () => Promise<Response>;
}

export const FollowButton: React.FC<FollowButtonProps> = ({
  isActive,
  createFollow,
  deleteFollow,
}) => {
  const [isFollowing, setIsFollowing] = useState(isActive);

  const handleOnClickFollow = async () => {
    const response = !isFollowing ? await createFollow() : await deleteFollow();

    response.ok && setIsFollowing(!isFollowing);
  };

  return (
    <Button
      style={{ width: '100%' }}
      type={!isFollowing ? 'primary' : 'ghost'}
      onClick={handleOnClickFollow}
    >
      {isFollowing ? 'Dejar de seguir' : 'Seguir'}
    </Button>
  );
};

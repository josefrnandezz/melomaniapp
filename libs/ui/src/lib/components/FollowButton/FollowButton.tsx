import { Button } from 'antd';
import { useState } from 'react';

interface FollowButtonProps {
  isActive?: boolean;
}

export const FollowButton: React.FC<FollowButtonProps> = ({ isActive }) => {
  const [isFollowing, setIsFollowing] = useState(isActive);

  const handleOnClickFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <Button
      style={{ width: '150px' }}
      type={isFollowing ? 'primary' : 'ghost'}
      onClick={handleOnClickFollow}
    >
      {isFollowing ? 'Dejar de seguir' : 'Seguir'}
    </Button>
  );
};

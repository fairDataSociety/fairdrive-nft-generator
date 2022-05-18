import { FC } from 'react';

interface AuthenticationHeaderProps {
  title: string;
  content: string;
}

const AuthenticationHeader: FC<AuthenticationHeaderProps> = ({
  title,
  content,
}) => {
  return (
    <div className="w-108 text-center">
      <h1 className="mb-4 font-semibold text-3xl text-main-purple leading-10">
        {title}
      </h1>
      <p className="font-normal text-base text-color-accents-plum-black">
        {content}
      </p>
    </div>
  );
};

export default AuthenticationHeader;

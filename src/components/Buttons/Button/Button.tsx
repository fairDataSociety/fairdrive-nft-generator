import { FC, ReactNode, ReactChild } from 'react';

interface ButtonProps {
  type?: 'button' | 'submit';
  variant:
    | 'primary'
    | 'primary-outlined'
    | 'secondary'
    | 'tertiary'
    | 'tertiary-outlined';
  label?: string;
  icon?: ReactNode;
  onClick?: any;
  className?: string;
  padding?: string;
  children?: ReactChild | ReactChild[];
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  type = 'button',
  variant,
  label,
  icon,
  onClick,
  className,
  padding,
  children,
  disabled = false,
}) => {
  const getVariantStyling = () => {
    switch (variant) {
      case 'primary':
        return (
          'bg-color-shade-dark-4-day text-main-purple text-base effect-style-small-button-drop-shadow' +
          ' ' +
          (padding ? '' : 'py-3 px-8')
        );
      case 'primary-outlined':
        return (
          'bg-none border border-color-accents-purple-heavy text-color-accents-purple-heavy text-base' +
          ' ' +
          (padding ? '' : 'py-3 px-8')
        );
      case 'secondary':
        return (
          'bg-color-shade-white-night text-color-accents-purple-black text-base' +
          ' ' +
          (padding ? '' : 'py-3 px-8')
        );
      case 'tertiary':
        return (
          'text-color-accents-purple-black text-xs' +
          ' ' +
          (padding ? '' : 'py-2 px-3')
        );
      case 'tertiary-outlined':
        return (
          'bg-none border border-color-accents-purple-heavy text-color-accents-purple-heavy text-xs' +
          ' ' +
          (padding ? '' : 'py-2 px-3')
        );
    }
  };

  const getVariantDisabledStyle = () => {
    if (disabled) {
      switch (variant) {
        case 'primary':
          return 'text-color-shade-light-3-night disabled:bg-color-shade-dark-4-day';
        case 'primary-outlined':
          return 'text-color-shade-light-3-night disabled:border-color-shade-light-3-night';
        case 'secondary':
          return 'bg-none text-color-shade-light-3-night';
        case 'tertiary':
          return '';
        case 'tertiary-outlined':
          return '';
      }
    } else return '';
  };

  const getVariantSelectedStyle = () => {
    if (!disabled) {
      switch (variant) {
        case 'primary':
          return 'focus:shadow-dark-purple focus:bg-color-shade-dark-4 effect-style-small-button-drop-shadow';
        case 'primary-outlined':
          return 'focus:shadow-dark-purple focus:bg-color-shade-dark-3-day';
        case 'secondary':
          return 'focus:shadow-dark-purple focus:bg-color-shade-white-night';
        case 'tertiary':
          return 'focus:text-base';
        case 'tertiary-outlined':
          return 'focus:shadow-dark-purple focus:bg-color-shade-dark-3-day';
      }
    } else return '';
  };

  const getVariantHoverStyle = () => {
    if (!disabled) {
      switch (variant) {
        case 'primary':
          return 'hover:shadow-soft-purple hover:bg-color-shade-dark-4 effect-style-small-button-drop-shadow';
        case 'primary-outlined':
          return 'hover:shadow-soft-purple hover:bg-color-shade-dark-3-day';
        case 'secondary':
          return 'hover:shadow-soft-purple hover:bg-color-shade-white-night';
        case 'tertiary':
          return 'hover:text-base';
        case 'tertiary-outlined':
          return 'hover:shadow-soft-purple hover:bg-color-shade-dark-3-day';
      }
    } else return '';
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${getVariantStyling()} ${getVariantHoverStyle()} ${getVariantDisabledStyle()} ${getVariantSelectedStyle()} ${className} ${padding} text-center rounded`}
      disabled={disabled}
    >
      {children ? (
        children
      ) : (
        <div>
          {label}
          {icon}
        </div>
      )}
    </button>
  );
};

export default Button;

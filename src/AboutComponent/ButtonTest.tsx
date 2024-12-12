import React from 'react';
import { Button, Flex } from 'antd';

interface ButtonTestProps {
  onClick?: () => void;
  children: string;
  className?: string;
  disabled?: boolean;
}

const ButtonTest: React.FC<ButtonTestProps> = ({
  onClick,
  children,
  className,
  disabled,
}) => (
  <Flex gap="small" wrap>
    <Button disabled={disabled} className={className} onClick={onClick}>
      {children}
    </Button>
  </Flex>
);

export default ButtonTest;
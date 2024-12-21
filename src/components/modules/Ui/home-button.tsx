import React from "react";
import {  Link } from "react-router-dom";
import {Button } from "antd";

const HomeButton: React.FC = () => {
  return (
    <Link to="/">
      <Button type="default" size="large">
        На главную
      </Button>
    </Link>
  );
};

export default HomeButton
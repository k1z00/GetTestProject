
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import "../style/loading.css"; // Подключаем файл со стилями

const App = () => (
    <Spin
      className="spin"
      indicator={
        <LoadingOutlined style={{ fontSize: 85, color: "white" }} spin />
      }
    />
);

export default App;

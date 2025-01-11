import { apiClient } from "@shared/lib/api-client";
import { useState, useEffect } from "react";
import "../style/my-list.css";
import { Link} from "react-router-dom";
import { PaginatedTestsResponse, TestResponse } from "@app/models/test";
import {  Button, List, Typography} from "antd";




const { Title, Paragraph } = Typography;

const MyTestList: React.FC = () => {
    const [testsList, setTestsList] = useState<TestResponse[]>([]);
    const [page, setPage] = useState(1);
    const [totalTests, setTotalTests] = useState(0);
   
   
    

    const fetchTestsList = async (page: number) => {
     

        try {
            const response: PaginatedTestsResponse = await apiClient.FetchTestsUserList(page);
            const { data, pagination } = response;
            if (data) {
                setTestsList(data);
                setTotalTests(pagination.total);
            }
        } catch {
            console.log("An error occurred");
        }
    };

    useEffect(() => {
        fetchTestsList(page).then(() => {
            window.scrollTo(0, 0); 
        });;
    }, [page]);


    

    return (
        <div className="test-list-container">
            <div className="test-list-items">
                <div className="test-list-items-head">
                    <div className="list-items-head-text">
                        <Title level={1} className="test-list-items-title">Список тестов</Title>
                        <Paragraph className="Paragraph-total"><p>Всего тестов: {totalTests}</p></Paragraph>
                    </div>
                </div>

                <List
                    className="test-list-items-ul"
                    dataSource={testsList}
                    renderItem={(test) => (
                        <List.Item className="test-list-items-li" key={test.id}>
                            <div className="text-info">
                                <Title level={3}>{test.title}</Title>
                                <Paragraph><p>Источник: {test.source}</p></Paragraph>
                            </div>
                            <div className="button-li">
                                <Link to={`/test/${test.id}`}>
                                    <Button className="test-list-items-li-button" type="primary">
                                        Пройти
                                    </Button>
                                </Link>
                            </div>
                        </List.Item>
                    )}
                />

                <div className="button-pagination">
                    <Button
                        className="button-pagination-btn"
                        onClick={() => setPage((prevPage) => prevPage - 1)}
                        disabled={page === 1}
                    >
                        Предыдущая страница
                    </Button>
                    <Button
                        className="button-pagination-btn"
                        onClick={() => setPage((prevPage) => prevPage + 1)}
                        disabled={testsList.length === 0 || testsList.length < 10}
                    >
                        Следующая страница
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MyTestList;
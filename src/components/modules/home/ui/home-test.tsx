import React from "react";
import { Input, Button } from "antd";
import { useFetchStore } from "../store/store-home";
import { useTestStore } from "../../test/store/store-test";
import { apiClient } from "../../../../shared/lib/api-client";
import { useNavigate } from "react-router-dom";
import './home-test.css'

const { TextArea } = Input;

const HomeCreateTest: React.FC = () => {
  const {
    title,
    source,
    loading,
    error,
    setTitle,
    setSource,
    setLoading,
    setError,
    setIsSuccess,
     resetForm
  } = useFetchStore();
 const { setData } = useTestStore();
  const navigate = useNavigate();

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSource(e.target.value);
  };

  const handleSubmit = async () => {
    
    setLoading(true);
    setError(null);
    setIsSuccess(false);
    try {
      const response = await apiClient.FetchTest(title, source); 
       setData(response); 
      setIsSuccess(true); 
      navigate("/test", { state: { testData: response } }); 
       resetForm();
    } catch (error) {
      setError("Failed to generate test. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="test-container">
      <div className="test-items">
        <h1 className="test-title">Fetch Data</h1>
        <div className="test-inputfield">
          <TextArea
            rows={19}
            placeholder="Title"
            value={title}
            onChange={handleTextAreaChange}
            className="test-texarea"
          />
          <div className="test-input">
            <Input
              placeholder="Source"
              value={source}
              onChange={handleInputChange}
            />
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Loading..." : "Fetch Data"}
            </Button>
          </div>
        </div>

        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    </div>
  );
};

export default HomeCreateTest;

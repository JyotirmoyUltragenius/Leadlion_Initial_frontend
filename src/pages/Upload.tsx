
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.name.endsWith('.csv')) {
      setFile(selectedFile);
    } else {
      toast({
        title: "Invalid File",
        description: "Please select a CSV file",
        variant: "destructive",
      });
    }
  };

  const handleUpload = () => {
    if (file) {
      // In a real app, we would process the CSV file here
      navigate("/mapping", { state: { fileName: file.name } });
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Upload CSV File</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-blue-500 hover:text-blue-600"
            >
              Click to upload or drag and drop
            </label>
            {file && (
              <p className="mt-2 text-sm text-gray-600">{file.name}</p>
            )}
          </div>
          <Button
            onClick={handleUpload}
            disabled={!file}
            className="w-full"
          >
            Proceed to Mapping
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Upload;

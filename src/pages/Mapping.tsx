
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { standardColumns } from "@/lib/database";
import { useToast } from "@/components/ui/use-toast";

const Mapping = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileName = location.state?.fileName || "Unknown File";

  // Sample columns from the uploaded file (in a real app, these would come from parsing the CSV)
  const sampleColumns = ["Company Name", "Email Address", "Phone Number", "Full Name"];
  const [mappings, setMappings] = useState<Record<string, string>>({});

  const handleMapping = (sourceColumn: string, targetColumn: string) => {
    setMappings((prev) => ({
      ...prev,
      [sourceColumn]: targetColumn,
    }));
  };

  const handleSave = () => {
    // In a real app, we would save the mappings and process the CSV file
    toast({
      title: "Success",
      description: "Column mappings saved successfully",
    });
    navigate("/upload");
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Map Columns - {fileName}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            {sampleColumns.map((column) => (
              <div key={column} className="grid grid-cols-2 gap-4 items-center">
                <div className="text-sm font-medium">{column}</div>
                <Select
                  value={mappings[column]}
                  onValueChange={(value) => handleMapping(column, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(standardColumns).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => navigate("/upload")}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Mappings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Mapping;

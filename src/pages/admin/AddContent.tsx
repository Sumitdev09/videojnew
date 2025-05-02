
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ContentForm from "@/components/admin/ContentForm";
import { Content } from "@/types";
import { useToast } from "@/components/ui/use-toast";

const AddContent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCreateContent = (contentData: Content) => {
    // In a real app, this would save to a backend
    // Here we'll just simulate success and navigate back
    
    // Generate a unique ID for the new content
    const newContent = {
      ...contentData,
      id: String(Date.now()),
    };

    // For demo purposes, we'll just show a toast and navigate back
    toast({
      title: "Content created",
      description: `${contentData.title} has been created successfully.`,
    });

    // Navigate back to content list
    navigate("/admin/content");
  };

  return (
    <Layout>
      <main className="container mx-auto px-4 py-16 pt-28">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Add New Content</h1>
          </div>
          
          <div className="bg-netflix-darkGray border border-netflix-mediumGray rounded-md p-6">
            <ContentForm onSubmit={handleCreateContent} />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default AddContent;

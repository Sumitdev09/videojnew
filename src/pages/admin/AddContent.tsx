
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ContentForm from "@/components/admin/ContentForm";
import { Content } from "@/types";
import { getContent, saveContent } from "@/lib/data";
import { useToast } from "@/components/ui/use-toast";

const AddContent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCreateContent = (contentData: Content) => {
    // Always get the latest content list first
    const currentContent = getContent();
    
    // Generate a unique ID for the new content
    const newContent = {
      ...contentData,
      id: String(Date.now()),
    };
    
    // Add the new content to the existing content
    const updatedContent = [...currentContent, newContent];
    
    // Save to localStorage
    saveContent(updatedContent);
    console.log("New content created:", newContent.title);

    toast({
      title: "Content created",
      description: `${newContent.title} has been created successfully.`,
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
            <p className="text-netflix-lightGray mt-2">
              Fill out the form below to add new content to the platform.
            </p>
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

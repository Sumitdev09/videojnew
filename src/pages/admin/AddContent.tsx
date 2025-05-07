
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ContentForm from "@/components/admin/ContentForm";
import { Content } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { saveContent, getContent } from "@/lib/data";

const AddContent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCreateContent = (contentData: Content) => {
    // Generate a unique ID for the new content
    const newContent = {
      ...contentData,
      id: String(Date.now()),
    };

    // Get current content and add the new one
    const currentContents = getContent();
    const updatedContents = [...currentContents, newContent];
    
    // Save to localStorage
    saveContent(updatedContents);
    
    // Dispatch an event to notify other components about the update
    window.dispatchEvent(new Event('content-updated'));

    // Show success toast
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

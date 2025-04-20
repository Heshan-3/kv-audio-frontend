import { createClient } from "@supabase/supabase-js";

const anon_key =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppbmtybW5ka3FieWl6cmFhZWpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MzkzNzUsImV4cCI6MjA2MDMxNTM3NX0.oSPmpW_qTIxCnSzqX_qtBdwJiaWsISAMZXop5BBJfDU";
const supabase_url = "https://zinkrmndkqbyizraaejg.supabase.co";

const supabase = createClient(supabase_url, anon_key);

export default function mediaUpload(file) {
	return new Promise((resolve, reject) => {
        if(file == null){
            reject("No file selected")
        }

		const timestamp = new Date().getTime();
		const fileName = timestamp + file.name;

		supabase.storage
			.from("images")
			.upload(fileName, file, {
				cacheControl: "3600",
				upsert: false,
			})
			.then(() => {
				const publicUrl = supabase.storage.from("images").getPublicUrl(fileName)
					.data.publicUrl;
				resolve(publicUrl);
			}).catch(()=>{
                reject("Error uploading file")
            })
	});
}

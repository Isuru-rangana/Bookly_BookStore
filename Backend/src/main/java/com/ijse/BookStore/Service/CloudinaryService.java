package com.ijse.BookStore.Service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

    public String uploadImage(MultipartFile file) throws IOException {
        try {
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            return uploadResult.get("url").toString();
        } catch (IOException e) {
            throw new IOException("Error uploading image to Cloudinary", e);
        }
    }

    public void deleteImage(String imageUrl) {
        try {
            if (imageUrl != null && !imageUrl.isEmpty()) {
                String publicId = extractPublicIdFromUrl(imageUrl);
                cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private String extractPublicIdFromUrl(String imageUrl) {
        String[] urlParts = imageUrl.split("/");
        String fileName = urlParts[urlParts.length - 1];
        return fileName.substring(0, fileName.lastIndexOf(".")); // Remove file extension
    }
} 
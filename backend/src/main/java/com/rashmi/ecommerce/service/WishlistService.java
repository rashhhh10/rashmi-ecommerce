package com.rashmi.ecommerce.service;

import com.rashmi.ecommerce.model.Product;
import com.rashmi.ecommerce.model.User;
import com.rashmi.ecommerce.model.Wishlist;
import com.rashmi.ecommerce.model.WishlistItem;
import com.rashmi.ecommerce.repository.ProductRepository;
import com.rashmi.ecommerce.repository.UserRepository;
import com.rashmi.ecommerce.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class WishlistService {
    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    public Wishlist getWishlistByUserId(Long userId) {
        return wishlistRepository.findByUserId(userId)
                .orElseGet(() -> createWishlistForUser(userId));
    }

    private Wishlist createWishlistForUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Wishlist wishlist = new Wishlist();
        wishlist.setUser(user);
        return wishlistRepository.save(wishlist);
    }

    @Transactional
    public Wishlist addToWishlist(Long userId, Long productId) {
        Wishlist wishlist = getWishlistByUserId(userId);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        boolean exists = wishlist.getItems().stream()
                .anyMatch(item -> item.getProduct().getId().equals(productId));

        if (!exists) {
            WishlistItem newItem = new WishlistItem();
            newItem.setWishlist(wishlist);
            newItem.setProduct(product);
            wishlist.getItems().add(newItem);
            wishlistRepository.save(wishlist);
        }

        return wishlist;
    }

    @Transactional
    public Wishlist removeFromWishlist(Long userId, Long productId) {
        Wishlist wishlist = getWishlistByUserId(userId);
        wishlist.getItems().removeIf(item -> item.getProduct().getId().equals(productId));
        return wishlistRepository.save(wishlist);
    }
}

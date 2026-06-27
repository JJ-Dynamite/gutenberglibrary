use axum::{routing::get, Router, Json, extract::Query, response::IntoResponse};
use serde::{Deserialize, Serialize};
use tower_http::cors::{CorsLayer, Any};

#[derive(Deserialize)]
struct SearchQuery { q: Option<String>, page: Option<u32> }

#[derive(Serialize)]
struct Book { id: u32, title: String, author: String, language: String, downloads: u32 }

async fn health_check() -> impl IntoResponse {
    Json(serde_json::json!({"status": "healthy", "service": "Gutenberg Library"}))
}

async fn list_books(Query(params): Query<SearchQuery>) -> impl IntoResponse {
    let books = vec![
        Book { id: 1, title: "Pride and Prejudice".into(), author: "Jane Austen".into(), language: "English".into(), downloads: 50000 },
        Book { id: 2, title: "Alice's Adventures in Wonderland".into(), author: "Lewis Carroll".into(), language: "English".into(), downloads: 45000 },
        Book { id: 3, title: "The Great Gatsby".into(), author: "F. Scott Fitzgerald".into(), language: "English".into(), downloads: 40000 },
    ];
    Json(serde_json::json!({"success": true, "books": books, "page": params.page.unwrap_or(1)}))
}

#[tokio::main]
async fn main() {
    let cors = CorsLayer::new().allow_origin(Any).allow_methods(Any).allow_headers(Any);
    let app = Router::new()
        .route("/", get(|| async { Json(serde_json::json!({"service": "Gutenberg Library", "books": 70000})) }))
        .route("/health", get(health_check))
        .route("/books", get(list_books))
        .layer(cors);
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3001").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

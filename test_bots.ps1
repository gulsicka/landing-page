# Test cases with different user agents and headers
$testCases = @(
    # Facebook
    @{
        name = "Facebook External Hit"
        userAgent = "facebookexternalhit/1.1"
        headers = @{
            "x-facebook-crawler" = "1"
        }
    },
    @{
        name = "Facebook App"
        userAgent = "FBAN/FB4A;FBAV/1.0.0"
        headers = @{
            "x-facebook-crawler" = "1"
        }
    },
    
    # Twitter
    @{
        name = "Twitter Bot"
        userAgent = "Twitterbot/1.0"
        headers = @{
            "x-twitter-crawler" = "1"
        }
    },
    @{
        name = "Twitter Feed"
        userAgent = "TwitterFeed/1.0"
        headers = @{
            "x-twitter-crawler" = "1"
        }
    },
    
    # TikTok
    @{
        name = "TikTok Bot"
        userAgent = "TikTokBot/1.0"
        headers = @{
            "x-tiktok-crawler" = "1"
        }
    },
    @{
        name = "TikTok App"
        userAgent = "TikTok/26.2.0"
        headers = @{
            "x-tiktok-crawler" = "1"
        }
    },
    
    # Instagram
    @{
        name = "Instagram Bot"
        userAgent = "InstagramBot/1.0"
        headers = @{
            "x-instagram-crawler" = "1"
        }
    },
    @{
        name = "Instagram App"
        userAgent = "Instagram 219.0.0.12.117"
        headers = @{
            "x-instagram-crawler" = "1"
        }
    },
    
    # LinkedIn
    @{
        name = "LinkedIn Bot"
        userAgent = "LinkedInBot/1.0"
        headers = @{
            "x-linkedin-crawler" = "1"
        }
    },
    @{
        name = "LinkedIn App"
        userAgent = "LinkedIn/1.0"
        headers = @{
            "x-linkedin-crawler" = "1"
        }
    },
    
    # Common Bots
    @{
        name = "Python Requests"
        userAgent = "python-requests/2.28.1"
        headers = @{
            "Accept" = "*/*"
        }
    },
    @{
        name = "Curl"
        userAgent = "curl/7.64.1"
        headers = @{
            "Accept" = "*/*"
        }
    },
    @{
        name = "Selenium"
        userAgent = "selenium/4.0.0"
        headers = @{
            "Accept" = "*/*"
        }
    },
    @{
        name = "Playwright"
        userAgent = "playwright/1.0.0"
        headers = @{
            "Accept" = "*/*"
        }
    },
    
    # Regular Browser
    @{
        name = "Chrome Browser"
        userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        headers = @{
            "Accept" = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
            "Accept-Language" = "en-US,en;q=0.5"
            "Accept-Encoding" = "gzip, deflate, br"
            "Connection" = "keep-alive"
            "Upgrade-Insecure-Requests" = "1"
            "Sec-Fetch-Dest" = "document"
            "Sec-Fetch-Mode" = "navigate"
            "Sec-Fetch-Site" = "none"
            "Sec-Fetch-User" = "?1"
            "DNT" = "1"
            "Sec-Ch-Ua" = '"Google Chrome";v="91", "Chromium";v="91"'
            "Sec-Ch-Ua-Mobile" = "?0"
            "Sec-Ch-Ua-Platform" = '"Windows"'
        }
    }
)

Write-Host "Starting bot detection tests...`n"

foreach ($testCase in $testCases) {
    Write-Host "Testing with $($testCase.name):"
    Write-Host "User Agent: $($testCase.userAgent)"
    Write-Host "Headers: $($testCase.headers | ConvertTo-Json)"
    
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3000" -UserAgent $testCase.userAgent -Headers $testCase.headers
        
        # Check if the response contains the blog content
        $isBlogContent = $response.Content -match "Pawsome Playhouse"
        Write-Host "Result: $($isBlogContent ? 'Saw blog content (Bot detected)' : 'Saw redirect page (Real user)')"
        Write-Host "Response length: $($response.Content.Length)"
        
        # Additional checks
        $hasMetaTags = $response.Content -match '<meta property="og:'
        $hasImages = $response.Content -match '<img'
        Write-Host "Has Meta Tags: $hasMetaTags"
        Write-Host "Has Images: $hasImages"
    }
    catch {
        Write-Host "Error: $_"
    }
    
    Write-Host "`n"
} 
import { isVercel } from '../config/database.js';
import config from '../../src/config.js';

export const generateHomePage = (data) => {
    const {
        currentTime,
        runtime,
        apiUrl,
        testUrl,
        healthUrl,
        correctBaseUrl,
        requestUrl,
        totalCalls,
        todayCalls,
        weekCalls,
        monthCalls,
        lastUpdated,
        nextReset,
        nextWeeklyReset,
        nextMonthlyReset,
        storageType,
        storageIcon
    } = data;

    const baseUrl = requestUrl.replace(/\/+$/, '');
    const docsUrl = `${baseUrl}/docs`;

    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>zzz-Meting API 服务</title>
    <meta name="description" content="zzz-Meting API服务 - 提供稳定可靠的音乐API接口">
    <link rel="icon" href="https://imgbed.904002.xyz/file/img/blog/avatar/zzz.webp" type="image/webp">
    <meta name="theme-color" content="#50B7FE">
    
    <style>
        /* 基础样式 */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }
        
        /* 深色主题变量 */
        :root {
            --bg-primary: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            --bg-overlay: rgba(0, 0, 0, 0.4);
            --card-bg: rgba(255, 255, 255, 0.15);
            --card-bg-hover: rgba(255, 255, 255, 0.2);
            --text-primary: #ffffff;
            --text-secondary: rgba(255, 255, 255, 0.9);
            --text-muted: rgba(255, 255, 255, 0.5);
            --border-color: rgba(255, 255, 255, 0.2);
            --shadow-color: rgba(0, 0, 0, 0.3);
            --accent-color: #50B7FE;
            --accent-hover: #3AA7FE;
            --success-color: #2ecc71;
            --warning-color: #f39c12;
            --danger-color: #e74c3c;
            --btn-primary: linear-gradient(45deg, #50B7FE, #3AA7FE);
            --btn-success: linear-gradient(45deg, #2ecc71, #27ae60);
            --btn-purple: linear-gradient(45deg, #9b59b6, #8e44ad);
            --btn-orange: linear-gradient(45deg, #ff7e5f, #feb47b);
            --stat-total: #50B7FE;
            --stat-today: #FFE92C;
            --stat-week: #FF9C00;
            --stat-month: #10FBDF;
            --time-color: #FFE92C;
            --development-color: #50B7FE;
            --version-gradient: linear-gradient(90deg, #50B7FE, #FFE92C);
        }
        
        /* 浅色主题变量 */
        [data-theme="light"] {
            --bg-primary: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            --bg-overlay: rgba(255, 255, 255, 0.4);
            --card-bg: rgba(255, 255, 255, 0.5);
            --card-bg-hover: rgba(255, 255, 255, 0.9);
            --text-primary: #333333;
            --text-secondary: #555555;
            --text-muted: #777777;
            --border-color: rgba(0, 0, 0, 0.1);
            --shadow-color: rgba(0, 0, 0, 0.1);
            --accent-color: #50B7FE;
            --accent-hover: #3AA7FE;
            --success-color: #28a745;
            --warning-color: #ffc107;
            --danger-color: #e74c3c;
            --btn-primary: linear-gradient(45deg, #50B7FE, #3AA7FE);
            --btn-success: linear-gradient(45deg, #28a745, #218838);
            --btn-purple: linear-gradient(45deg, #6f42c1, #5a32a3);
            --btn-orange: linear-gradient(45deg, #fd7e14, #e8590c);
            --stat-total: #50B7FE;
            --stat-today: #FFE92C;
            --stat-week: #FF9C00;
            --stat-month: #10FBDF;
            --time-color: #FFE92C;
            --development-color: #50B7FE;
            --version-gradient: linear-gradient(90deg, #50B7FE, #FFE92C);
        }
        
        body {
            font-family: 'JingNanYuanTi', 'Segoe UI', 'Microsoft YaHei', -apple-system, BlinkMacSystemFont, sans-serif;
            background: var(--bg-primary);
            background-size: cover;
            min-height: 100vh;
            color: var(--text-primary);
            line-height: 1.6;
            position: relative;
        }
        
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg-overlay);
            z-index: -1;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        /* 主题切换按钮 */
        .theme-toggle {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 50px;
            padding: 8px 16px;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 15px var(--shadow-color);
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .theme-toggle:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px var(--shadow-color);
        }
        
        .theme-toggle span {
            font-size: 0.9rem;
            font-weight: 600;
            color: var(--text-primary);
        }
        
        .theme-icon {
            font-size: 1.2rem;
            transition: transform 0.3s ease;
        }
        
        [data-theme="light"] .theme-icon.sun {
            display: none;
        }
        
        [data-theme="light"] .theme-icon.moon {
            display: inline;
        }
        
        [data-theme="dark"] .theme-icon.sun {
            display: inline;
        }
        
        [data-theme="dark"] .theme-icon.moon {
            display: none;
        }
        
        header {
            text-align: center;
            margin-bottom: 3rem;
            padding: 2rem;
            background: var(--card-bg);
            border-radius: 20px;
            box-shadow: 0 10px 30px var(--shadow-color);
            backdrop-filter: blur(10px);
            border: 1px solid var(--border-color);
        }
        
        .logo {
            font-size: 3.5rem;
            margin-bottom: 1rem;
            animation: float 3s ease-in-out infinite;
        }
        
        h1 {
            font-size: 2.5rem;
            color: var(--text-primary);
            margin-bottom: 0.5rem;
            text-shadow: 0 2px 10px var(--shadow-color);
        }
        
        .tagline {
            font-size: 1.2rem;
            color: var(--text-secondary);
            margin-bottom: 1rem;
            text-shadow: 0 1px 5px var(--shadow-color);
        }
        
        .version-badge {
            display: inline-block;
            background: var(--version-gradient);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 50px;
            font-size: 0.9rem;
            font-weight: bold;
            margin-bottom: 1rem;
            box-shadow: 0 4px 15px var(--shadow-color);
            animation: versionPulse 3s infinite alternate;
        }
        
        @keyframes versionPulse {
            0% {
                background: linear-gradient(90deg, #50B7FE, #FFE92C);
                box-shadow: 0 4px 15px rgba(80, 183, 254, 0.5);
            }
            100% {
                background: linear-gradient(90deg, #3AA7FE, #FFD700);
                box-shadow: 0 6px 20px rgba(80, 183, 254, 0.7), 0 0 30px rgba(255, 233, 44, 0.3);
            }
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
            margin-bottom: 3rem;
        }

        .info-card {
            background: var(--card-bg);
            padding: 1.2rem;
            border-radius: 15px;
            box-shadow: 0 5px 15px var(--shadow-color);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: 1px solid var(--border-color);
            backdrop-filter: blur(10px);
        }

        .info-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 30px var(--shadow-color);
            background: var(--card-bg-hover);
        }

        .info-card h3 {
            color: var(--text-primary);
            margin-bottom: 0.8rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            text-shadow: 0 1px 5px var(--shadow-color);
            font-size: 1.1rem;
        }
        
        .info-card h3::before {
            content: '📋';
            font-size: 1.2rem;
        }
        
        .info-item {
            margin-bottom: 0.8rem;
            padding-bottom: 0.8rem;
            border-bottom: 1px solid var(--border-color);
        }

        .info-item:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }

        .label {
            font-weight: 600;
            color: var(--text-secondary);
            margin-bottom: 0.15rem;
            text-shadow: 0 1px 3px var(--shadow-color);
            font-size: 0.9rem;
        }
        
        .value {
            color: var(--text-primary);
            word-break: break-all;
            text-shadow: 0 1px 3px var(--shadow-color);
        }
        
        .value a {
            color: var(--accent-color);
            text-decoration: none;
        }
        
        .value a:hover {
            color: var(--accent-hover);
            text-decoration: underline;
        }
        
        .status-badge {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            margin-left: 0.5rem;
            box-shadow: 0 2px 8px var(--shadow-color);
        }
        
        .status-online {
            background: var(--btn-success);
            color: white;
        }
        
        .status-local {
            background: var(--development-color);
            color: white;
        }
        
        .status-warning {
            background: var(--warning-color);
            color: white;
        }

        .btn {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            background: var(--btn-primary);
            color: white;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            font-size: 1rem;
            box-shadow: 0 4px 15px var(--shadow-color);
        }

        .btn:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 20px rgba(80, 183, 254, 0.4);
        }

        .btn-api {
            background: var(--btn-purple);
        }

        .btn-api:hover {
            box-shadow: 0 6px 20px rgba(155, 89, 182, 0.4);
        }

        .btn-test {
            background: var(--btn-success);
        }

        .btn-test:hover {
            box-shadow: 0 6px 20px rgba(46, 204, 113, 0.4);
        }

        /* API构建器样式 */
        .api-builder {
            background: var(--card-bg);
            padding: 1.2rem;
            border-radius: 15px;
            box-shadow: 0 5px 15px var(--shadow-color);
            border: 1px solid var(--border-color);
            backdrop-filter: blur(10px);
        }

        .api-builder h2 {
            color: var(--text-primary);
            margin-bottom: 0;
            text-shadow: 0 1px 5px var(--shadow-color);
            font-size: 1.3rem;
        }

        .form-row {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 1rem;
        }

        .form-group {
            display: flex;
            flex-direction: column;
        }

        .form-group label {
            font-weight: 600;
            color: var(--text-secondary);
            margin-bottom: 0.3rem;
            text-shadow: 0 1px 3px var(--shadow-color);
            font-size: 0.9rem;
        }

        .form-control {
            padding: 0.7rem 1rem;
            border: 2px solid var(--border-color);
            border-radius: 10px;
            font-size: 0.95rem;
            color: var(--text-primary);
            background: var(--card-bg);
            transition: all 0.3s ease;
            box-shadow: 0 2px 10px var(--shadow-color);
        }

        .form-control:focus {
            outline: none;
            border-color: var(--accent-color);
            box-shadow: 0 0 0 3px rgba(80, 183, 254, 0.3);
        }

        .form-control option {
            color: #333;
            background: #fff;
        }

        .generated-url {
            background: var(--card-bg-hover);
            border: 2px solid var(--border-color);
            border-radius: 10px;
            padding: 0.8rem;
            margin-bottom: 1rem;
            min-height: 45px;
            word-break: break-all;
            color: var(--text-primary);
            font-family: 'Courier New', Courier, monospace;
            box-shadow: 0 2px 10px var(--shadow-color);
            font-size: 0.85rem;
        }

        .url-label {
            font-weight: 600;
            color: var(--text-secondary);
            margin-bottom: 0.3rem;
            text-shadow: 0 1px 3px var(--shadow-color);
            font-size: 0.9rem;
        }

        .button-group {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
        }

        .btn-copy {
            background: var(--btn-orange);
            padding: 0.6rem 1rem;
            border-radius: 50px;
            font-weight: 600;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            font-size: 0.9rem;
            box-shadow: 0 4px 15px var(--shadow-color);
            color: white;
        }

        .btn-copy:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 20px rgba(255, 126, 95, 0.4);
        }

        .btn-visit {
            background: var(--btn-success);
            padding: 0.6rem 1rem;
            border-radius: 50px;
            font-weight: 600;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            font-size: 0.9rem;
            box-shadow: 0 4px 15px var(--shadow-color);
            color: white;
            text-decoration: none;
        }

        .btn-visit:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 20px rgba(46, 204, 113, 0.4);
        }

        .btn-clear {
            background: var(--btn-purple);
            padding: 0.6rem 1rem;
            border-radius: 50px;
            font-weight: 600;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            font-size: 0.9rem;
            box-shadow: 0 4px 15px var(--shadow-color);
            color: white;
        }

        .btn-clear:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 20px rgba(155, 89, 182, 0.4);
        }

        .copy-feedback {
            display: none;
            background: var(--success-color);
            color: white;
            padding: 0.4rem 0.8rem;
            border-radius: 5px;
            margin-top: 0.5rem;
            font-size: 0.85rem;
            text-align: center;
        }

        .example-buttons {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
            margin-top: 0.8rem;
        }

        .btn-example {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            padding: 0.4rem 0.8rem;
            border-radius: 8px;
            color: var(--text-secondary);
            cursor: pointer;
            font-size: 0.8rem;
            transition: all 0.3s ease;
            box-shadow: 0 2px 10px var(--shadow-color);
        }

        .btn-example:hover {
            background: var(--card-bg-hover);
            border-color: var(--accent-color);
            color: var(--text-primary);
            transform: translateY(-2px);
        }

        .btn-save-cookie {
            background: var(--btn-success);
            padding: 0.5rem 1rem;
            border-radius: 10px;
            font-weight: 600;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            font-size: 0.85rem;
            box-shadow: 0 2px 10px var(--shadow-color);
            color: white;
            white-space: nowrap;
        }

        .btn-save-cookie:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(46, 204, 113, 0.4);
        }

        .btn-clear-cookie {
            background: var(--btn-purple);
            padding: 0.5rem 1rem;
            border-radius: 10px;
            font-weight: 600;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            font-size: 0.85rem;
            box-shadow: 0 2px 10px var(--shadow-color);
            color: white;
            white-space: nowrap;
        }

        .btn-clear-cookie:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(155, 89, 182, 0.4);
        }

        @media (max-width: 768px) {
            .form-row {
                grid-template-columns: 1fr;
            }
        }

        footer {
            text-align: center;
            margin-top: 3rem;
            padding: 2rem;
            color: var(--text-muted);
            font-size: 0.9rem;
            background: var(--card-bg);
            border-radius: 15px;
            border: 1px solid var(--border-color);
            backdrop-filter: blur(10px);
        }
        
        .time-display {
            font-size: 1rem;
            color: var(--time-color);
            font-weight: 600;
            margin-top: 0.3rem;
            text-shadow: 0 1px 5px var(--shadow-color);
        }
        
        .stats-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            margin-top: 8px;
        }

        /* 横屏显示优化 */
        @media (min-width: 769px) and (orientation: landscape) {
            .stats-container {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        
        
        .stat-item {
            text-align: center;
            padding: 8px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            border: 1px solid var(--border-color);
        }

        .stat-number {
            font-size: 1.2rem;
            font-weight: bold;
            margin-bottom: 3px;
            text-shadow: 0 2px 8px var(--shadow-color);
        }

        .stat-label {
            font-size: 0.8rem;
            color: var(--text-secondary);
            text-shadow: 0 1px 3px var(--shadow-color);
        }
        
        .stat-total {
            color: var(--stat-total);
        }
        
        .stat-today {
            color: var(--stat-today);
        }
        
        .stat-week {
            color: var(--stat-week);
        }
        
        .stat-month {
            color: var(--stat-month);
        }
        
        .vercel-notice {
            margin-top: 10px;
            padding: 10px;
            background: rgba(255, 193, 7, 0.1);
            border-radius: 8px;
            border-left: 3px solid var(--warning-color);
            font-size: 0.9rem;
        }
        
        .vercel-notice strong {
            color: var(--warning-color);
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .spinning {
            animation: spin 2s linear infinite;
        }
        
        @media (max-width: 768px) {
            .container {
                padding: 1rem;
            }
            
            h1 {
                font-size: 2rem;
            }
            
            .logo {
                font-size: 2.5rem;
            }
            
            .theme-toggle {
                top: 10px;
                right: 10px;
                padding: 6px 12px;
            }
            
            .info-grid {
                grid-template-columns: 1fr;
            }

            .actions {
                grid-template-columns: 1fr;
            }

            .stats-container {
                grid-template-columns: repeat(2, 1fr);
                gap: 8px;
            }
        }
        
        @media (max-width: 480px) {
            .stats-container {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <!-- 主题切换按钮 -->
    <div class="theme-toggle" id="themeToggle" title="切换深色/浅色模式">
        <span class="theme-icon sun">🌙</span>
        <span class="theme-icon moon">🌞</span>
        <span id="themeText">深色模式</span>
    </div>
    
    <div class="container">
        <header>
            <div class="logo">
                <img src="https://imgbed.904002.xyz/file/img/blog/avatar/zzz.webp" 
                     alt="zzz" 
                     style="width: 180px; height: 180px; border-radius: 50%; object-fit: cover; border: 4px solid var(--border-color); box-shadow: 0 8px 25px var(--shadow-color); background: var(--card-bg); padding: 3px; animation: float 3s ease-in-out infinite;">
            </div>
            <h1>zzz-Meting API</h1>
            <div class="version-badge">版本 v1.6.4</div>
            ${isVercel ? `
            <div class="vercel-notice">
                <strong>Vercel环境说明：</strong> 当前运行在Vercel环境中，未配置数据库统计数据无法保存。如需API调用统计，请配置环境变量或部署到本地或自有服务器。
            </div>` : ''}
        </header>
        
        <div class="info-grid">
            <div class="info-card">
                <h3>系统信息</h3>
                <div class="info-item">
                    <div class="label">运行环境</div>
                    <div class="value">
                        ${runtime}
                        <span class="status-badge ${runtime.includes('Node') ? 'status-online' : 'status-local'}">
                            ${runtime.includes('Node') ? '生产环境' : '开发环境'}
                        </span>
                    </div>
                </div>
                <div class="info-item">
                    <div class="label">存储方式</div>
                    <div class="value">
                        ${storageIcon} ${storageType}
                        ${isVercel ? '<span style="color: var(--warning-color); margin-left: 10px;">(无法统计)</span>' : ''}
                    </div>
                </div>
                <div class="info-item">
                    <div class="label">服务端口</div>
                    <div class="value">${config.PORT}</div>
                </div>
                <div class="info-item">
                    <div class="label">部署地区</div>
                    <div class="value">
                        ${config.OVERSEAS ? '海外服务器' : '中国大陆服务器'}
                        <span class="status-badge ${config.OVERSEAS ? 'status-local' : 'status-online'}">
                            ${config.OVERSEAS ? '海外' : '大陆'}
                        </span>
                    </div>
                </div>
                <div class="info-item">
                    <div class="label">当前时间</div>
                    <div class="value time-display">${currentTime}</div>
                </div>
                <div class="info-item">
                    <div class="label">API 状态</div>
                    <div class="value">
                        <span class="status-badge status-online">运行正常</span>
                        ${isVercel ? '<span class="status-badge" style="background: linear-gradient(45deg, #000000, #484848); color: white; margin-left: 5px;">Vercel</span>' : ''}
                    </div>
                </div>
                ${!isVercel ? `
                <div class="info-item">
                    <div class="label">下次重置</div>
                    <div class="value">
                        今日：${nextReset.time}<br>
                        本周：${nextWeeklyReset.time}<br>
                        本月：${nextMonthlyReset.time}
                    </div>
                </div>` : ''}
                <div class="info-item">
                    <div class="label">访问地址</div>
                    <div class="value">
                        <a href="${requestUrl}" style="color: var(--accent-color);">${requestUrl}</a>
                    </div>
                </div>
                ${!isVercel ? `
                <div class="info-item">
                    <div class="label">实际地址</div>
                    <div class="value">
                        <a href="${correctBaseUrl}" style="color: var(--accent-color);">${correctBaseUrl}</a>
                    </div>
                </div>` : ''}
                ${!isVercel ? `
                <div class="info-item">
                    <div class="label">API 调用统计</div>
                    <div class="value">
                        <div class="stats-container">
                            <div class="stat-item">
                                <div class="stat-number stat-total">${totalCalls.toLocaleString()}</div>
                                <div class="stat-label">总调用次数</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number stat-today">${todayCalls.toLocaleString()}</div>
                                <div class="stat-label">今日调用</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number stat-week">${weekCalls.toLocaleString()}</div>
                                <div class="stat-label">本周调用</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number stat-month">${monthCalls.toLocaleString()}</div>
                                <div class="stat-label">本月调用</div>
                            </div>
                        </div>
                    </div>
                </div>` : ''}
            </div>

            <div class="api-builder">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h2>🎛️ API 参数构建器</h2>
                    <div style="display: flex; gap: 0.5rem;">
                        <a href="${testUrl}" class="btn btn-test" style="padding: 0.5rem 1rem; font-size: 0.85rem; text-decoration: none;">🔧 测试接口</a>
                        <a href="${docsUrl}" class="btn btn-api" style="padding: 0.5rem 1rem; font-size: 0.85rem; text-decoration: none;">📚 参数文档</a>
                    </div>
                </div>
                <p style="color: var(--text-secondary); margin-bottom: 1rem;">选择或填写API参数，自动生成请求链接并复制</p>

                <div class="form-row">
                    <div class="form-group">
                        <label for="server-select">音乐平台</label>
                        <select id="server-select" class="form-control">
                            <option value="">请选择音乐平台...</option>
                            <option value="netease">网易云音乐</option>
                            <option value="tencent">QQ音乐</option>
                            <option value="kugou">酷狗音乐</option>
                            <option value="spotify">Spotify</option>
                            <option value="ytmusic">YouTube Music</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="type-select">请求类型</label>
                        <select id="type-select" class="form-control">
                            <option value="">请选择请求类型...</option>
                            <option value="song">歌曲信息</option>
                            <option value="url">播放地址</option>
                            <option value="lrc">歌词</option>
                            <option value="pic">歌曲封面</option>
                            <option value="playlist">歌单</option>
                            <option value="artist">歌手歌曲</option>
                            <option value="search">搜索</option>
                        </select>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group" style="grid-column: 1 / -1;">
                        <label for="id-input">资源ID / 搜索关键词</label>
                        <input type="text" id="id-input" class="form-control" placeholder="输入歌曲ID、歌单ID、歌手ID或搜索关键词" style="width: 100%;">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group" style="grid-column: 1 / -1;">
                        <label for="cookie-input">Cookie <span style="font-size: 0.8rem; color: var(--text-muted);">（仅支持网易云、QQ音乐、酷狗）（目前只有网易云）</span></label>
                        <div style="display: flex; gap: 0.5rem;">
                            <input type="text" id="cookie-input" class="form-control" placeholder="会员歌曲可填写Cookie使用（会过期）" style="flex: 1;">
                            <button type="button" id="save-cookie-btn" class="btn-save-cookie" onclick="saveCookie()" title="保存Cookie">💾 保存</button>
                            <button type="button" id="clear-cookie-btn" class="btn-clear-cookie" onclick="clearCookie()" title="清除保存的Cookie">🗑️ 清除</button>
                        </div>
                    </div>
                </div>

                <div class="url-label">生成的API链接：</div>
                <div class="generated-url" id="generated-url">
                    请先选择音乐平台、请求类型和填写资源ID...
                </div>

                <div class="button-group">
                    <button class="btn-copy" onclick="copyUrl()">📋 复制链接</button>
                    <button class="btn-visit" onclick="visitUrl()">🔗 访问链接</button>
                    <button class="btn-clear" onclick="clearAll()">🗑️ 清空</button>
                </div>

                <div class="copy-feedback" id="copy-feedback">✅ 已复制到剪贴板！</div>

                <div style="margin-top: 1rem; color: var(--text-secondary);">
                    <strong>快速示例：</strong>
                    <div class="example-buttons">
                        <button class="btn-example" onclick="loadExample('netease', 'song', '1901371647')">🎵 网易云歌曲</button>
                        <button class="btn-example" onclick="loadExample('tencent', 'search', '周杰伦')">🔍 QQ音乐搜索</button>
                        <button class="btn-example" onclick="loadExample('kugou', 'url', 'b3a52a7a958bf0aed0ebfba2e9a818b7')">▶️ 酷狗播放</button>
                        <button class="btn-example" onclick="loadExample('spotify', 'song', '0Hyy7tYKo4Duk')">🎧 Spotify</button>
                        <button class="btn-example" onclick="loadExample('netease', 'playlist', '7512726744')">📜 网易云歌单</button>
                    </div>
                </div>
            </div>
        </div>

        <footer>
            <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem;">
                <div>
                    <p>© 2026 zzz-Meting API</p>
                    <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.5rem;">最后更新：${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}</p>
                </div>
                <div style="text-align: right;">
                    <p style="font-weight: 600;">Powered by <a href="https://github.com/chuyegzs/Meting-UI-API" target="_blank" style="color: var(--accent-color); text-decoration: none;">Meting-UI-API</a></p>
                </div>
            </div>
        </footer>
    </div>
    
    <script>
        // 主题切换功能
        const themeToggle = document.getElementById('themeToggle');
        const themeText = document.getElementById('themeText');
        const currentThemeSpan = document.getElementById('currentTheme');
        const html = document.documentElement;
        
        // 从localStorage获取保存的主题，或者根据系统偏好设置
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // 初始化主题
        function initTheme() {
            let theme = 'dark'; // 默认深色
            
            if (savedTheme) {
                theme = savedTheme;
            } else if (systemPrefersDark) {
                theme = 'dark';
            } else {
                theme = 'light';
            }
            
            applyTheme(theme);
        }
        
        // 应用主题
        function applyTheme(theme) {
            html.setAttribute('data-theme', theme);
            
            if (theme === 'light') {
                themeText.textContent = '浅色模式';
                currentThemeSpan.textContent = '浅色模式';
                themeToggle.querySelector('.theme-icon').classList.remove('spinning');
            } else {
                themeText.textContent = '深色模式';
                currentThemeSpan.textContent = '深色模式';
            }
            
            localStorage.setItem('theme', theme);
            
            const icon = themeToggle.querySelector('.theme-icon');
            icon.classList.add('spinning');
            setTimeout(() => {
                icon.classList.remove('spinning');
            }, 600);
        }
        
        // 切换主题
        function toggleTheme() {
            const currentTheme = html.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        }
        
        // 事件监听
        themeToggle.addEventListener('click', toggleTheme);
        
        // 监听系统主题变化
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!savedTheme) {
                const newTheme = e.matches ? 'dark' : 'light';
                applyTheme(newTheme);
            }
        });
        
        // 实时更新时间
        function updateTime() {
            const now = new Date();
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
                timeZone: 'Asia/Shanghai'
            };
            const timeStr = now.toLocaleString('zh-CN', options);
            const timeElement = document.querySelector('.time-display');
            if (timeElement) {
                timeElement.textContent = timeStr;
            }
        }
        
        // 每秒更新一次时间
        setInterval(
updateTime, 1000);
        
        // 添加简单的页面加载动画
        document.addEventListener('DOMContentLoaded', function() {
            // 初始化主题
            initTheme();
            
            const cards = document.querySelectorAll('.info-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
            
            // 初始化时间显示
            updateTime();
        });

        // 添加键盘快捷键 (Ctrl+Shift+T 切换主题)
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                toggleTheme();
            }
        });
        
        // 页面加载完成后
        function loadCustomFont() {
            const mainFonts = [
                '/set/ziti/moren.woff2',
                '/set/ziti/moren.ttf'
            ];
            
            const fallbackFonts = [
                '/set/ziti/backup.woff2',
                '/set/ziti/backup.ttf',
                '/set/ziti/fallback.woff2',
                '/set/ziti/fallback.ttf'
            ];
            
            let fontLoaded = false;
            let attemptedFonts = new Set();
            
            function tryLoadFont(fontUrl) {
                if (attemptedFonts.has(fontUrl)) {
                    return Promise.reject(new Error('已尝试过此字体'));
                }
                
                attemptedFonts.add(fontUrl);
                
                return fetch(fontUrl, { method: 'HEAD' })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('字体文件不存在');
                        }
                        return fetch(fontUrl);
                    })
                    .then(response => response.blob())
                    .then(blob => {
                        const blobUrl = URL.createObjectURL(blob);
                        const font = new FontFace('JingNanYuanTi', 'url(' + blobUrl + ')', {
                            weight: 'normal',
                            style: 'normal',
                            display: 'swap'
                        });
                        return font.load();
                    })
                    .then(loadedFont => {
                        document.fonts.add(loadedFont);
                        document.body.style.fontFamily = "'JingNanYuanTi', 'Segoe UI', 'Microsoft YaHei', -apple-system, BlinkMacSystemFont, sans-serif";
                        fontLoaded = true;
                        console.log('✅ 自定义字体加载成功: ' + fontUrl);
                        return true;
                    });
            }
            
            async function tryFontList(fontList) {
                for (const fontUrl of fontList) {
                    if (fontLoaded) break;
                    
                    try {
                        await tryLoadFont(fontUrl);
                        break;
                    } catch (error) {
                        console.log('⚠️ 字体加载失败: ' + fontUrl);
                    }
                }
            }
            
            async function tryRandomFallback() {
                const exts = ['.woff2', '.ttf'];
                const availableFonts = [];
                
                for (const ext of exts) {
                    for (let i = 1; i <= 10; i++) {
                        const fontUrl = '/set/ziti/fallback' + i + ext;
                        try {
                            const response = await fetch(fontUrl, { method: 'HEAD' });
                            if (response.ok) {
                                availableFonts.push(fontUrl);
                            }
                        } catch (e) {
                            break;
                        }
                    }
                }
                
                if (availableFonts.length > 0) {
                    const randomFont = availableFonts[Math.floor(Math.random() * availableFonts.length)];
                    console.log('ℹ️ 检测到 ' + availableFonts.length + ' 个备用字体，随机选择: ' + randomFont);
                    try {
                        await tryLoadFont(randomFont);
                    } catch (error) {
                        console.log('⚠️ 备用字体加载失败: ' + randomFont);
                    }
                }
            }
            
            async function startLoading() {
                await tryFontList(mainFonts);
                
                if (!fontLoaded) {
                    await tryFontList(fallbackFonts);
                }
                
                if (!fontLoaded) {
                    console.log('ℹ️ 备用字体加载失败，尝试随机备用字体...');
                    await tryRandomFallback();
                }
                
                if (!fontLoaded) {
                    console.log('ℹ️ 所有自定义字体加载失败，使用系统默认字体');
                    document.body.style.fontFamily = "'Segoe UI', 'Microsoft YaHei', -apple-system, BlinkMacSystemFont, sans-serif";
                }
            }
            
            startLoading();
        }
        
        if (window.FontFace && document.fonts) {
            loadCustomFont();
        } else {
            document.body.style.fontFamily = "'Segoe UI', 'Microsoft YaHei', -apple-system, BlinkMacSystemFont, sans-serif";
        }

        // API构建器功能
        const serverSelect = document.getElementById('server-select');
        const typeSelect = document.getElementById('type-select');
        const idInput = document.getElementById('id-input');
        const cookieInput = document.getElementById('cookie-input');
        const generatedUrlDiv = document.getElementById('generated-url');
        const copyFeedback = document.getElementById('copy-feedback');
        const baseUrl = '${baseUrl}';

        // 支持Cookie的平台
        const cookieSupportedServers = ['netease', 'tencent', 'kugou'];

        // 更新Cookie输入框状态
        function updateCookieState() {
            const server = serverSelect.value;
            const isSupported = cookieSupportedServers.includes(server);
            cookieInput.disabled = !isSupported;
            cookieInput.style.opacity = isSupported ? '1' : '0.5';
            cookieInput.style.cursor = isSupported ? 'text' : 'not-allowed';
            if (!isSupported) {
                cookieInput.value = '';
                cookieInput.placeholder = '当前平台不支持Cookie';
                updateCookieButtonState();
            } else {
                cookieInput.placeholder = '会员歌曲可填写Cookie使用（会过期）';
                // 从API读取保存的Cookie
                fetch(\`/api/cookie?server=\${server}\`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.success && data.cookie) {
                            cookieInput.value = data.cookie;
                        } else {
                            cookieInput.value = '';
                        }
                        updateCookieButtonState();
                    })
                    .catch(() => {
                        cookieInput.value = '';
                        updateCookieButtonState();
                    });
            }
        }

        // 更新Cookie按钮状态
        function updateCookieButtonState() {
            const server = serverSelect.value;
            const isSupported = cookieSupportedServers.includes(server);
            const hasSavedCookie = cookieInput.value.trim() !== '';
            const saveBtn = document.getElementById('save-cookie-btn');
            const clearBtn = document.getElementById('clear-cookie-btn');
            if (saveBtn) saveBtn.disabled = !isSupported;
            if (clearBtn) clearBtn.disabled = !hasSavedCookie;
        }

        // 保存Cookie
        function saveCookie() {
            const server = serverSelect.value;
            const cookie = cookieInput.value.trim();
            if (!cookieSupportedServers.includes(server)) {
                alert('当前平台不支持Cookie');
                return;
            }
            if (!cookie) {
                alert('请先填写Cookie');
                return;
            }

            fetch('/api/cookie', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ server, cookie })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Cookie保存成功！');
                    updateCookieButtonState();
                    generateUrl();
                } else {
                    alert('保存失败: ' + (data.message || '未知错误'));
                }
            })
            .catch(error => {
                alert('保存失败: ' + error.message);
            });
        }

        // 清除Cookie
        function clearCookie() {
            const server = serverSelect.value;
            if (!cookieSupportedServers.includes(server)) {
                return;
            }
            if (confirm('确定要清除保存的Cookie吗？')) {
                fetch('/api/cookie', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ server, cookie: '' })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        cookieInput.value = '';
                        alert('Cookie已清除');
                        updateCookieButtonState();
                        generateUrl();
                    } else {
                        alert('清除失败: ' + (data.message || '未知错误'));
                    }
                })
                .catch(error => {
                    alert('清除失败: ' + error.message);
                });
            }
        }

        // 生成URL函数
        function generateUrl() {
            const server = serverSelect.value;
            const type = typeSelect.value;
            const id = idInput.value.trim();
            const cookie = cookieInput.value.trim();

            if (!server || !type || !id) {
                generatedUrlDiv.textContent = '请先选择音乐平台、请求类型和填写资源ID...';
                return;
            }

            let url = \`\${baseUrl}/api?server=\${server}&type=\${type}&id=\${encodeURIComponent(id)}\`;
            if (cookie && cookieSupportedServers.includes(server)) {
                url += \`&cookie=\${encodeURIComponent(cookie)}\`;
            }
            generatedUrlDiv.textContent = url;
        }

        // 复制URL函数
        function copyUrl() {
            const url = generatedUrlDiv.textContent;
            if (!url || url.includes('请先选择')) {
                alert('请先生成API链接');
                return;
            }

            navigator.clipboard.writeText(url).then(() => {
                copyFeedback.style.display = 'block';
                setTimeout(() => {
                    copyFeedback.style.display = 'none';
                }, 2000);
            }).catch(() => {
                // 降级方案：创建临时输入框
                const textarea = document.createElement('textarea');
                textarea.value = url;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                copyFeedback.style.display = 'block';
                setTimeout(() => {
                    copyFeedback.style.display = 'none';
                }, 2000);
            });
        }

        // 访问URL函数
        function visitUrl() {
            const url = generatedUrlDiv.textContent;
            if (!url || url.includes('请先选择')) {
                alert('请先生成API链接');
                return;
            }
            window.open(url, '_blank');
        }

        // 清空函数
        function clearAll() {
            serverSelect.value = '';
            typeSelect.value = '';
            idInput.value = '';
            cookieInput.value = '';
            generatedUrlDiv.textContent = '请先选择音乐平台、请求类型和填写资源ID...';
            updateCookieState();
        }

        // 加载示例函数
        function loadExample(server, type, id) {
            serverSelect.value = server;
            typeSelect.value = type;
            idInput.value = id;
            cookieInput.value = '';
            updateCookieState();
            generateUrl();
        }

        // 监听变化
        serverSelect.addEventListener('change', () => {
            updateCookieState();
            generateUrl();
        });
        typeSelect.addEventListener('change', generateUrl);
        idInput.addEventListener('input', generateUrl);
        cookieInput.addEventListener('input', generateUrl);

        // 初始化Cookie状态
        updateCookieState();
    </script>
</body>
</html>`;
};

export default generateHomePage;

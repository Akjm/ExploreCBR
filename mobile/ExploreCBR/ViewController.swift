//
//  ViewController.swift
//  ExploreCBR
//
//  Created by Ben Maliel on 5/07/2015.
//  Copyright (c) 2015 Ben Maliel. All rights reserved.
//

import UIKit
import Foundation
import CoreLocation



class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        let url = NSURL(string: "http://cgscomputing.com/govhack2/explore_cbr/mobile.html")
        let request = NSURLRequest(URL: url!)
        webView.loadRequest(request)
        
        let manager = CLLocationManager()
        if CLLocationManager.locationServicesEnabled() {
            manager.startUpdatingLocation()
        }

    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBOutlet var webView: UIWebView!
    

}

